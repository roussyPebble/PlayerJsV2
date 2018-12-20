import {INIT_MEDIA, MEDIA_PLAYING, MEDIA_ERROR, MEDIA_TIME_UPDATE, SEEKING, RESET_MEDIA} from '../../constants/action-types';

/**
 * @module Actions
 */
/**
 * Action init media info
 * @param mediaInfo {store.media.mediaInfo}
 * @returns {{type: string, payload: store.media.mediaInfo}}
 */
export function initMedia(mediaInfo) {
    return {
        type: INIT_MEDIA,
        payload: mediaInfo
    };
}

/**
 * Action notify on media playing status
 * @returns {{type: string}}
 */
export function mediaPlaying() {
    return {
        type: MEDIA_PLAYING
    };
}

/**
 * Action notify on media seeking status
 * @param status {boolean} Is seeking
 * @returns {{type: string, payload: boolean}}
 */
export function seeking(status) {
    return {
        type: SEEKING,
        payload: status
    };
}

/**
 * Action notify on media error
 * @param errorData {object} Error data
 * @returns {{type: string, payload: {object}}}
 */
export function mediaError(errorData) {
    return {
        type: MEDIA_ERROR,
        payload: errorData
    };
}

/**
 * Action notify of media current time update
 * @param time {number} Current time
 * @returns {{type: string, payload: number}}
 */
export function mediaTimeUpdate(time) {
    return {
        type: MEDIA_TIME_UPDATE,
        payload: time
    };
}

/**
 * Action reset media state
 * @param [restoringTime] {number} Time to seek once restored
 * @returns {{type: string}}
 */
export function resetMedia(restoringTime = null) {
    return {
        type: RESET_MEDIA,
        payload: restoringTime
    };
}