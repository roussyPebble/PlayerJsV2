import Hls from 'hls.js';
import { resetMedia } from '../../actions/media';
import { SUBTITLE_CODE, SUBTITLE_LABEL } from '../../constants/labels';
import { getLocalStorage } from '../../helpers/storage';
import { logError } from '../../helpers/logger';
import { getVideoTag } from '../../helpers/dom';
import { parseUrl } from '../../helpers/http';
import { SUBTITLES, VIDEO_DESCRIPTION } from '../../constants/storage';

/**
 * HLS provider class
 * @prop {method} hlsProvider - Initialize the HLS library
 * @prop videoElement - Select the video tag used by the provider
 * @prop {bool} readyToPlay - Flag to check if the provider is loaded
 */
class HlsJs {
    constructor(config) {
        this.isLive = config.SrcAvDiffusion === 'direct';
        this.initHls();
        this.videoElement = getVideoTag(config.uuid);
        this.readyToPlay = false;
        this.store = config.store;
        this.errors = {
            raising: false,
            limit: 3,
            time: null
        };
        if (!this.isLive) this.addSubtitlesTrack(parseUrl(config.closedCaption));
        this.handleError();
    }

    /**
     * Dispose provider
     */
    dispose() {
        this.destroyHls();
    }

    /**
     * Initialize HLS.js library
     */
    initHls() {
        if (Hls.isSupported()) {
            this.hlsProvider = new Hls(this.hlsConfig());
        } else {
            throw 'Error HLS not supported';
        }
    }

    /**
     * Destroy Hls.js instance
     */
    destroyHls() {
        this.hlsProvider.destroy();
    }

    /**
     * Reset HLS.js instance to recover from fatal errors
     */
    resetHls() {
        if (!this.store.getState().media.isLive){
            this.errors.time = this.videoElement.currentTime;
        } else {
            this.errors.time = null;
        }
        this.errors.raising = true;
        this.destroyHls();
        this.store.dispatch(resetMedia(this.errors.time));
    }

    /**
     * Return the Hls.js configuration object
     */
    hlsConfig() {
        return {
            startLevel: -1,
            loadLevel: -1,
            autoLevelCapping: -1,
            nextLevel: -1,
            forceKeyFrameOnDiscontinuity: true,
            enableCEA708Captions: this.isLive,
            captionsTextTrack1Label: SUBTITLE_LABEL,
            captionsTextTrack1LanguageCode: SUBTITLE_CODE,
        };
    }

    /**
     * Load media to HTML element
     * @param {object} vmData - Data from validation media
     * @param {boolean} isPlaying - is player playing
     */
    loadMedia(vmData, isPlaying) {
        this.hlsProvider.loadSource(vmData.url);
        this.hlsProvider.attachMedia(this.videoElement);
        this.readyToPlay = true;
        if (isPlaying) this.playMedia();
        return true;
    }

    /**
     * Call play() on HTML video element
     */
    playMedia() {
        if (this.isLive && this.videoElement.duration) this.videoElement.currentTime = this.videoElement.duration;
        if (this.readyToPlay) this.videoElement.play().then(() => {
            this.handleStorage();
            this.toggleSubtitles();
        });
    }

    /**
     * Seek video to time
     * @param time {number} Time to seek
     */
    seekTo(time) {
        this.videoElement.currentTime = time;
    }

    /**
     * Set configs based on local storage
     */
    handleStorage() {
        if (getLocalStorage(SUBTITLES) === true) this.activateSubtitles();
        if (getLocalStorage(VIDEO_DESCRIPTION) === true) this.activateVideoDescription();
    }

    /**
     * Call pause() on HTML video element
     */
    pauseMedia() {
        this.videoElement.pause();
    }

    /**
     * Activate or deactivate subtitles based on state
     */
    toggleSubtitles() {
        let state = this.store.getState();
        state.providers.subtitlesActive ? this.activateSubtitles() : this.deactivateSubtitles();
    }

    /**
     * Activate subtitles
     */
    activateSubtitles() {
        let state = this.store.getState();
        if (state.playerState.playedOnce) {
            let tracks = this.videoElement.textTracks;
            for (var i = 0; i < tracks.length; i++) {
                if (tracks[i].kind === 'captions') tracks[i].mode = 'showing';
            }
        }
        return true;
    }

    /**
     * Deactivate subtitles
     */
    deactivateSubtitles() {
        let state = this.store.getState();
        if (state.playerState.playedOnce) {
            let tracks = this.videoElement.textTracks;
            for (var i = 0; i < tracks.length; i++) {
                if (tracks[i].kind === 'captions') tracks[i].mode = 'hidden';
            }
        }
        return false;
    }

    /**
     * Set textTrack on video element
     * @param {string} trackUrl - Url of the vtt files
     */
    addSubtitlesTrack(trackUrl = '') {
        let track = document.createElement('track');
        track.kind = 'captions';
        track.label = SUBTITLE_LABEL;
        track.srclang = SUBTITLE_CODE;
        track.lang = SUBTITLE_LABEL;
        track.mode = 'hidden';
        track.src = trackUrl;
        track.id = 'subtitlesTrack';
        this.videoElement.setAttribute('crossorigin', 'withcredentials');
        this.videoElement.appendChild(track);
    }

    /**
     * Get the current bitrate
     */
    getCurrentBitrate() {
        return this.hlsProvider.currentLevel;
    }

    /**
     * Select a new bitrate
     * @param {int} index - Index of the desired bitrate
     */
    setBitrate(index) {
        return new Promise((resolve) => {
            if (!this.isLive) this.hlsProvider.nextLevel = index;
            this.hlsProvider.autoLevelCapping = index;
            this.hlsProvider.on(Hls.Events.LEVEL_SWITCHED, () => {
                resolve(true);
            });
        });
    }

    /**
     * Get audiotracks in the video manifest
     */
    getAudioTracks() {
        this.audioTracks = this.hlsProvider.audioTrackController.audioTracks;
        return this.audioTracks;
    }

    /**
     * Activate video description track. Use the track name containing 'dv'
     */
    activateVideoDescription() {
        let tracks = this.getAudioTracks();
        let asDvTrack = false;
        tracks.forEach((track, index) => {
            if (track.name.indexOf('dv') !== -1) {
                this.hlsProvider.audioTrackController.audioTrack = index;
                asDvTrack = true;
            }
        });

        return asDvTrack;
    }

    /**
     * Switch the audio track back to the none video described
     */
    deactivateVideoDescription() {
        this.hlsProvider.audioTrackController.audioTrack = 0;
        return false;
    }

    /**
     * Be notified of media playing state
     */
    mediaPlaying() {
        this.errors.raising = false;
    }

    /**
     * Be notified of media error
     * @param errorData {object} Error data
     */
    mediaError(errorData) {
        if (this.errors.raising) return;
        this.logError(errorData);
        this.resetHls();
    }

    /**
     * Handle HLS provider error
     * @private
     */
    handleError() {
        this.hlsProvider.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) this.mediaError(data);
        });
    }

    /**
     * Log error data
     * @private
     * @param data {object} Error data to log
     */
    logError(data) {
        logError('HLS Provider error', data, this.store.getState());
    }
}

export default HlsJs;
