/**
 * Fullscreen internal API
 * @module Fullscreen internal API
 */
import { detect } from 'detect-browser';
import { getPlayerContainer } from '../../helpers/dom';
const browserFullscreenMethods = userAgentSpecificMethod();

/**
 * Enter fullscreen on action enter
 */
export function enterFullscreen(uuid) {
    let videoContainer = getPlayerContainer(uuid);
    videoContainer[browserFullscreenMethods.requestFullscreen]();
    return true;
}

/**
 * Exit fullscreen on exit action
 */
export function exitFullscreen() {
    document[browserFullscreenMethods.exitFullscreen]();
    return false;
}

/**
 * Assigne the browser specifiec method for fullscreen
 */
export function userAgentSpecificMethod() {
    let browser = detect();
    let methods = {};
    let browserMethods;
    let defaultMethods = ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'];
    switch (browser.name) {
        case 'firefox':
            browserMethods = ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'];
            break;
        case 'chrome':
        case 'edge':
        case 'safari':
            browserMethods = ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'];
            break;
        default:
            browserMethods = defaultMethods;
            break;
    }

    defaultMethods.forEach((item, index) => {
        methods[item] = browserMethods[index];
    });

    return methods;
}