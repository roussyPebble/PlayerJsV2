import ADB from './sdk/VideoHeartbeat.min.js';
import { AdobeCongig } from './config';
import loadjs from 'loadjs';
import { logInfo } from '../../../helpers/logger';

export default class AdobeHeartbeatTracking {
    constructor(params) {
        this.params = params;
        this.playerInstance = params.playerInstance;
        this.videoElement = this.params.videoElement;
        this.MediaHeartbeat = ADB.va.MediaHeartbeat;
        this.MediaHeartbeatConfig = ADB.va.MediaHeartbeatConfig;
        this.MediaHeartbeatDelegate = ADB.va.MediaHeartbeatDelegate;
        this.loadLibraries();
    }

    initHeartbeat() {
        this.mediaConfig = this.initConfig();
        this.mediaDelegate = this.initMediaDelegate();
        this.visitor = this.initVisitor();
        this.appMeasurement = this.initAppMeasurement();
        this.mediaHeartbeat = new this.MediaHeartbeat(this.mediaDelegate, this.mediaConfig, this.appMeasurement);
        this.logger('Base class Initiated');
    }

    initConfig() {
        let mediaConfig = new this.MediaHeartbeatConfig();

        mediaConfig.trackingServer = AdobeCongig.trackingServer;
        mediaConfig.playerName = AdobeCongig.playerName;
        mediaConfig.debugLogging = this.params.debug;
        mediaConfig.ssl = true;

        return mediaConfig;
    }

    initMediaDelegate() {
        let mediaDelegate = new this.MediaHeartbeatDelegate();

        mediaDelegate.getCurrentPlaybackTime = () => {
            return this.videoElement.currentTime;
        };

        let qos = {
            bitrate: this.params.currentBitrate,
            startuptime: this.videoElement.currentTime,
            fps: null,
            droppedFrames: null
        };

        mediaDelegate.getQoSObject = () => {
            return this.MediaHeartbeat.createQoSObject(qos.bitrate, qos.startuptime, qos.fps, qos.droppedframes);
        };

        return mediaDelegate;
    }

    initAppMeasurement() {
        /* eslint-disable-next-line */
        let appMeasurement = new AppMeasurement();
        appMeasurement.visitor = this.visitor;
        appMeasurement.trackingServer = AdobeCongig.trackingServer;
        appMeasurement.account = AdobeCongig.rsid;
        appMeasurement.charSet = 'UTF-8';
        return appMeasurement;
    }

    initVisitor() {
        /* eslint-disable-next-line */
        let visitor = new Visitor(AdobeCongig.marketingCloudOrgID);
        visitor.trackingServer = AdobeCongig.trackingServer;
        return visitor;
    }

    loadLibraries() {
        let libraryToLoad = [];
        if (typeof window.AppMeasurement === 'undefined') libraryToLoad.push('//s.radio-canada.ca/player/ressources/js/AppMeasurement.js');
        if (typeof window.Visitor === 'undefined') libraryToLoad.push('//s.radio-canada.ca/player/ressources/js/VisitorAPI.js');
        loadjs(libraryToLoad, 'heartbeatLibraryLoaded');
        loadjs.ready('heartbeatLibraryLoaded', () => {
            this.initHeartbeat();
        });
    }

    logger(text, data = 'Not data provided') {
        if (!this.params.debug) return;
        var msg = `Playerjs Heartbeat => ${text}`;
        logInfo(msg, data);
    }
}