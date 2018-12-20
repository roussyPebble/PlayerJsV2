import AdobeHeartbeatTracking from '../index';
import { liveVideoTrackingEvents } from '../../../../constants/events';
import { AdobeCongig, mediaMarque } from '../config';
import { getPageName, metaPage } from '../../../../helpers/dataLayer';

export default class AdbLiveVideo extends AdobeHeartbeatTracking {
    constructor(params) {
        super(params);
        this.bindEvents(params.playerInstance);
        this.logger('AdbLiveVideo initiated');
    }

    bindEvents(playerInstance) {
        playerInstance.on(liveVideoTrackingEvents.LIVE_PROGRAM_START, (neuroData) => {
            this.onLiveProgramStart(neuroData);
        });

        playerInstance.on(liveVideoTrackingEvents.LIVE_PROGRAM_END, () => {
            this.logger('TO DO: Adobe tracking LIVE_PROGRAM_END');
        });

        playerInstance.on(liveVideoTrackingEvents.DISPOSE, () => {
            this.logger('TO DO: Adobe tracking DISPOSE');
        });

        playerInstance.on(liveVideoTrackingEvents.PAUSE, () => {
            this.trackPause();
        });
    }

    onLiveProgramStart(neuroData) {
        this.logger('LIVE_PROGRAM_START', neuroData);
        this.program = neuroData;
        this.createMediaObject();
        this.trackSessionStart();
        this.trackPlay();
    }

    trackSessionStart() {
        this.mediaHeartbeat.trackSessionStart(this.mediaObject, this.getContextData());
        this.logger('Session tracking start');
    }

    createMediaObject() {
        let name = this.constructVideoName();
        let infos = {
            name: name,
            id: name,
            length: -1,
            streamType: AdobeCongig.streamType.live
        };

        this.mediaObject = this.MediaHeartbeat.createMediaObject(infos.name, infos.id, infos.length, infos.streamType);
        this.logger(`Create media object. - ${JSON.stringify(infos)}`);
    }

    constructVideoName() {
        return [
            this.program.codeName ? this.program.codeName : '',
            this.params.metas.Date,
            'live',
            this.mediaMarque(this.params.metas.Network),
            this.params.metas.SrcTypeDocument,
            this.program.title
        ].join('|');
    }

    mediaMarque(network) {
        for (var t in mediaMarque) {
            if (mediaMarque.hasOwnProperty(t)) {
                if (mediaMarque[t].indexOf(network) !== -1) return t;
            }
        }
        return 'undefined';
    }

    getContextData() {
        var videoURL = document.location.href.split('?')[0];
        var metas = this.params.metas;
        var contextData = {
            videopage: getPageName(),
            videolang: 'fr',
            videourl: videoURL,
            player_contexte: 'tele',
            // player_clientId: this.playerSettings.site, -> We need to implement, client-configuaration system first
            media_videoNameParDate: this.videoNamePerDate(),
            media_title: this.program.title,
            media_date: metas.Date,
            media_emission: this.program.codeName,
            media_genre: metas.RcTheme,
            media_reseau: metas.Chaine,
            media_chaine: metas.Network,
            media_marque: this.mediaMarque(metas.Network),
            media_pageIdMedia: metas.idMedia,
            media_fileId: metas.idMedia,
            media_pageSection: metaPage('rc.section'),
            media_pageGroupeSection: metaPage('rc.groupeSection'),
            media_pageDomaine: metaPage('rc.domaine'),
            media_pageUrl: videoURL,
            media_pageFormatApplication: metaPage('rc.formatApplication'),
            media_pageApplication: metaPage('rc.application')
        };

        this.logger(`Creating custom context data. - ${JSON.stringify(contextData)}`);
        return contextData;
    }

    videoNamePerDate() {
        return [
            this.program.codeName ? this.program.codeName : '',
            this.params.metas.Date
        ].join('|');
    }

    trackPlay() {
        this.mediaHeartbeat.trackPlay();
        this.logger('track play');
    }

    trackPause() {
        this.logger('Paused content');
        this.mediaHeartbeat.trackComplete();
        this.mediaHeartbeat.trackSessionEnd();
    }
}