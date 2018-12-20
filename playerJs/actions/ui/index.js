import {
    A11Y_FOCUS, PAUSE_MEDIA, PLAY_MEDIA, PLAYER_IS_HOVER, SET_PLAYER_SIZE, ENTER_FULLSCREEN,
    EXIT_FULLSCREEN, MUTE, UNMUTE, VOLUME_CHANGED, VOLUME_BUTTON_IS_HOVER, SET_BITRATE, SELECTING_BITRATE,
    SUBTITLES_TOGGLE, SET_VIDEO_DESCRIPTION, SET_PROVIDER_BITRATE, SET_REDUCED, SEEK_TO, DISPLAY_INFO,
    SEEK_NEXT_SEC, SEEK_PREVIOUS_SEC, SHOW_THUMBNAIL, HIDE_THUMBNAIL
}
    from '../../constants/action-types';

export function pauseMedia() {
    return {
        type: PAUSE_MEDIA
    };
}

export function playMedia() {
    return {
        type: PLAY_MEDIA
    };
}

/**
 * Action video seek to time
 * @param time
 * @returns {{type: string, payload: number}}
 */
export function seekTo(time) {
    return {
        type: SEEK_TO,
        payload: time
    };
}

/**
 * Action seek x seconds after
 * @param sec {number} seconds to add
 * @returns {{type: string, payload: number}}
 */
export function seekNextSec(sec) {
    return {
        type: SEEK_NEXT_SEC,
        payload: sec
    };
}

/**
 * Action seek x seconds before
 * @param sec {number} seconds to remove
 * @returns {{type: string, payload: number}}
 */
export function seekPreviousSec(sec) {
    return {
        type: SEEK_PREVIOUS_SEC,
        payload: sec
    };
}

/**
 * Action set thumbnail position
 * @param mediaPosition {number} Percent from 0.0 to 1.0
 * @param xPosition {number} Position to display the middle of thumbnail (based on parent)
 * @param yPosition {number} Position to display bottom of thumbnail
 * @returns {{type: string, payload: number}}
 */
export function showThumbnail(mediaPosition, xPosition, yPosition) {
    return {
        type: SHOW_THUMBNAIL,
        payload: {
            mediaPosition,
            xPosition,
            yPosition
        }
    };
}

/**
 * Action hide thumbnail
 * @returns {{type: string}}
 */
export function hideThumbnail() {
    return {
        type: HIDE_THUMBNAIL
    };
}

export function a11yFocus(isFocus) {
    return {
        type: A11Y_FOCUS,
        payload: isFocus
    };
}

export function playerIsHover(mouseIn) {
    return {
        type: PLAYER_IS_HOVER,
        payload: {
            mouseIn: mouseIn
        }
    };
}

export function setPlayerDimensions(sizes) {
    return {
        type: SET_PLAYER_SIZE,
        payload: sizes
    };
}

export function enterFullscreen() {
    return {
        type: ENTER_FULLSCREEN
    };
}

export function exitFullscreen() {
    return {
        type: EXIT_FULLSCREEN
    };
}

export function mute(level) {
    return {
        type: MUTE,
        payload: level
    };
}

export function unmute(level) {
    return {
        type: UNMUTE,
        payload: level
    };
}

export function volumeChanged(level) {
    return {
        type: VOLUME_CHANGED,
        payload: level
    };
}

export function volumeBtnHover(mouseIn) {
    return {
        type: VOLUME_BUTTON_IS_HOVER,
        payload: mouseIn
    };
}

export function subtitlesToggle(isActive) {
    return {
        type: SUBTITLES_TOGGLE,
        payload: {
            state: isActive
        }
    };
}

export function setProviderBitrate(selectedBitrate){
    return {
        type: SET_PROVIDER_BITRATE,
        payload: selectedBitrate
    };
}

export function selectingBitrate(inProgress) {
    return {
        type: SELECTING_BITRATE,
        payload: {
            selectingBitrate: inProgress
        }
    };
}

export function setBitrate(params) {
    return {
        type: SET_BITRATE,
        payload: {
            index: params.bitrateindex,
            text: params.lines
        }
    };
}

export function setVideoDescription(status) {
    return {
        type: SET_VIDEO_DESCRIPTION,
        payload: status
    };
}

export function setReduced(isReduced){
    return {
        type: SET_REDUCED,
        payload: isReduced
    };
}

/**
 * Action display media info
 * @param display {boolean} Display info or not
 * @returns {{type: string, payload: boolean}}
 */
export function displayInfo(display) {
    return {
        type: DISPLAY_INFO,
        payload: display
    };
}

