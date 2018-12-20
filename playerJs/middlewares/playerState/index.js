/**
 * @module Player state
 */
import {
    ENTER_FULLSCREEN, EXIT_FULLSCREEN, LOAD_LOCALSTORAGE, MUTE,
    SET_REDUCED, RESET_MEDIA, SET_VIDEO_DESCRIPTION, UNMUTE, VOLUME_CHANGED, MEDIA_TIME_UPDATE
} from '../../constants/action-types';
import { onReduced } from '../../events/playerState';
import {subtitlesToggle} from '../../actions/ui';
import {getLocalStorage, setLocalStorage} from '../../helpers/storage';
import {VIDEO_DESCRIPTION, VOLUME_LEVEL, VOLUME_MUTED} from '../../constants/storage';
import {setVolume} from '../../internalApi/volume';
import {enterFullscreen, exitFullscreen} from '../../internalApi/fullscreen';
import {setMediaInfo, setMetaMedia} from '../../actions/metaMedia';
import InitialState from '../../store/initialState';
import {resetMedia} from '../../actions/media';

/**
 * Player state middleware
 * @param store
 * @returns {Function}
 */
export default store => next => action => {
    let state = store.getState();
    switch (action.type){
        case LOAD_LOCALSTORAGE: {
            let volumeLevel = getLocalStorage(VOLUME_LEVEL);
            if (typeof volumeLevel !== 'number') volumeLevel = (state.volume ? state.volume.level : InitialState.playerState.volume.level);
            let mute = getLocalStorage(VOLUME_MUTED) === true;
            action.payload = Object.assign(
                action.payload || {},
                {
                    mute,
                    volume: mute ? 0 : volumeLevel,
                    videoDescriptionActive: getLocalStorage(VIDEO_DESCRIPTION)
                }
            );
            setVolume(state.playerState.uuid, action.payload.volume);
            break;
        }
        case ENTER_FULLSCREEN: {
            action.payload =  enterFullscreen(state.playerState.uuid);
            break;
        }
        case EXIT_FULLSCREEN: {
            action.payload = exitFullscreen();
            break;
        }
        case MUTE: {
            setVolume(state.playerState.uuid, 0);
            setLocalStorage(VOLUME_MUTED, true);
            break;
        }
        case UNMUTE: {
            setVolume(state.playerState.uuid, action.payload);
            setLocalStorage(VOLUME_MUTED, false);
            break;
        }
        case VOLUME_CHANGED: {
            let level = parseFloat(action.payload);
            if (isNaN(level)) level = 0;
            setVolume(state.playerState.uuid, level);
            setLocalStorage(VOLUME_LEVEL, level);
            setLocalStorage(VOLUME_MUTED, false);
            action.payload = level;
            break;
        }
        case SET_VIDEO_DESCRIPTION: {
            setLocalStorage(VIDEO_DESCRIPTION, action.payload);
            break;
        }
        case SET_REDUCED: {
            store.dispatch(subtitlesToggle(false));
            store.dispatch(onReduced(action.payload));
            break;
        }
        case RESET_MEDIA: {
            store.dispatch(setMediaInfo(state.media.idMedia, state.media.appCode));
            store.dispatch(setMetaMedia(state.media));
            break;
        }
        case MEDIA_TIME_UPDATE: {
            if (!state.media.isLive && action.payload >= state.metaMedia.metas.length){
                store.dispatch(resetMedia());
            }
        }
    }

    next(action);
};