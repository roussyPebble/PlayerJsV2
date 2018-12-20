import appConfig from '../../../config';
import { getVideoTag } from '../../../helpers/dom';
import { savePlugins } from '../../../helpers/window';
import AdbLiveVideo from './liveVideo';
import { SET_META_MEDIA } from '../../../constants/action-types';
/**
 * Init Adobe Heartbeat plugin to track player data
 * @param playerInstance {Object} The player instance from which the plugin will listen events
 * @param store {Object} Redux store if the current player
 */
export function initHeartbeat(playerInstance, store) {
    let state = store.getState();
    let pluginInit = false;
    let requiredParams = {
        env: appConfig.environnement,
        playerInstance: playerInstance,
        videoElement: getVideoTag(state.playerState.uuid),
        uuid: state.playerState.uuid,
        bitrate: state.providers.currentBitrate,
        debug: state.userParams.integrationParams.heartbeatDebug
    };

    playerInstance.on(SET_META_MEDIA, (data) => {
        requiredParams.metas = data;
        if (!pluginInit) savePlugins(state.playerState.uuid, 'adobeHeartbeat', selectSubClass(requiredParams));
        pluginInit = true;
    });
}

/**
 * Select and init the correct class for the type of tracking
 * @param requiredParams {object} Params required to instanciate adobe heartbeat
 */
function selectSubClass(requiredParams) {
    if (isLiveVideo(requiredParams.metas)) return new AdbLiveVideo(requiredParams);
}

/**
 * Check if the media is a live video
 * @param Meta {Object} Meta data
 */
function isLiveVideo(metas) {
    return metas.SrcAvDiffusion === 'direct' && metas.webdiffusion === 'false' && metas.SrcTypeDocument === 'video';
}
