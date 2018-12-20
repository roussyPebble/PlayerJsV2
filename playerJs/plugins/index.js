import { initHeartbeat } from './tracking/adobeHeartbeat/init';

/**
 * Initial required plugins for a player
 * @param params {Object} Params comming from the integration
 * @param store {Object} Redux store if the current player
 * @param playerInstance {Object} The player instance from which the plugin will listen events
 */
export function initPlugins(playerInstance, params, store) {
    if (params.heartbeat) initHeartbeat(playerInstance, store);
}


