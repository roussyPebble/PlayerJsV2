/**
 * Window
 * @module Window
 */

import HlsJs from '../../providers/hls';
import {HLS} from '../../constants/providers';

/**
 * Get player instance provider
 * @param uuid {string} Instance uuid
 * @returns {Object}
 */
export function getProvider(uuid) {
    return window.RadioCanadaPlayer.players && window.RadioCanadaPlayer.players[uuid] ? window.RadioCanadaPlayer.players[uuid].provider : [];
}

/**
 * Set needed global variable in RadioCanadaPlayer with the goog UUID
 * @param uuid {string} Instance uuid
 */
export function setWindowStorage(uuid) {
    if (!window.RadioCanadaPlayer.players) window.RadioCanadaPlayer.players = [];
    window.RadioCanadaPlayer.players[uuid] = {};
}

/**
 * Set player instance provider
 * @param uuid {string} Instance uuid
 * @param configs {Object} Provider configurations
 * @param providerType {string} Provider type to create
 * @param restoring {boolean} Is in restoring state
 */
export function setProvider(uuid, configs, providerType, restoring) {
    let player = window.RadioCanadaPlayer.players[uuid];
    if (player.provider && restoring) {
        player.provider.dispose();
        player.provider = undefined;
    }
    if (!player.provider) {
        let provider = null;
        switch (providerType) {
            case HLS: {
                provider = new HlsJs(configs);
                break;
            }
        }
        player.provider = provider;
    }
}

/**
 * Save plugin to RadioCanadaPlayer objwct store in the window
 * @param uuid {string} The unique id of the player for which the plugin was instanciated
 * @param pluginName{string} The name of the plug under which it will appear in the RadioCanada Global variable
 * @param plugin {Plugin instance} The instance of the instanciated plugin
 */
export function savePlugins(uuid, pluginName, plugin) {
    if (!window.RadioCanadaPlayer.players[uuid].plugins) window.RadioCanadaPlayer.players[uuid].plugins = [];
    window.RadioCanadaPlayer.players[uuid].plugins[pluginName] = plugin;
}

/**
 * Save player event emitter
 * @param uuid {string} Unique id of player
 * @param emitter {SafeEmitter} Event emitter
 */
export function setEventEmitter(uuid, emitter) {
    window.RadioCanadaPlayer.players[uuid].emitter = emitter;
}

/**
 * Get player event emitter
 * @param uuid {string} Unique id of player
 * @returns {SafeEmitter}
 */
export function getEventEmitter(uuid) {
    return window.RadioCanadaPlayer.players[uuid].emitter;
}

/**
 * Emit an event trough player event emitter
 * @param uuid {string} Unique id of player
 * @param name {string} Event name
 * @param data {*} Event data
 */
export function emitEvent(uuid, name, data){
    getEventEmitter(uuid).emit(name, data);
}