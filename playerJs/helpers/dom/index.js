/**
 * DOM
 * @module DOM
 */

/**
 * Get rcplayer-container element
 * @param uuid {string} Instance uuid
 * @returns {Element}
 */
export function getPlayerContainer(uuid) {
    return document.querySelector(`.rcplayer-container[data-uuid="${uuid}"]`);
}

/**
 * Get rcplayer-container .video-tag element
 * @param uuid {string} Instance uuid
 * @returns {*}
 */
export function getVideoTag(uuid) {
    return getPlayerContainer(uuid).querySelector('.video-tag');
}