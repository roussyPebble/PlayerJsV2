/**
 * @module Provider
 */
import {
    ON_VALIDATION_MEDIA_COMPLETED, PAUSE_MEDIA, SET_META_MEDIA, PLAY_MEDIA, SUBTITLES_TOGGLE,
    SET_PROVIDER_BITRATE, SET_VIDEO_DESCRIPTION, LOAD_LOCALSTORAGE, MEDIA_PLAYING, MEDIA_ERROR, SEEK_TO,
    SEEK_NEXT_SEC, SEEK_PREVIOUS_SEC, RESET_MEDIA
} from '../../constants/action-types';
import { setBitrate, selectingBitrate, seekTo, pauseMedia } from '../../actions/ui';
import { initMedia, resetMedia } from '../../actions/media';
import { getVideoTag } from '../../helpers/dom';
import { getProvider, setProvider } from '../../helpers/window';
import {getLocalStorage, setLocalStorage} from '../../helpers/storage';
import {SUBTITLES} from '../../constants/storage';

/**
 * Provider middleware
 * @param store
 * @returns {Function}
 */
export default store => next => action => {
    let state = store.getState();
    let provider = getProvider(state.playerState.uuid);
    switch (action.type){
        case LOAD_LOCALSTORAGE: {
            action.payload = Object.assign(
                action.payload || {},
                {
                    subtitlesActive: getLocalStorage(SUBTITLES)
                }
            );
            break;
        }
        case SET_META_MEDIA: {
            action.payload.uuid = state.playerState.uuid;
            action.payload.store = store;
            setProvider(state.playerState.uuid, action.payload, action.payload.providerId, state.media.restoring);
            break;
        }
        case ON_VALIDATION_MEDIA_COMPLETED: {
            action.payload.providerReady = provider.loadMedia(action.payload.vmData, action.payload.isPlaying);
            break;
        }
        case PLAY_MEDIA: {
            if (!state.providers.providerReady || state.media.restoring) {
                getVideoTag(state.playerState.uuid).load();
                store.dispatch(initMedia(state.media));
            }
            provider.playMedia();
            break;
        }
        case RESET_MEDIA: {
            if (!action.payload && !state.media.isLive) {
                store.dispatch(pauseMedia());
                store.dispatch(seekTo(0));
            }
            break;
        }
        case SEEK_TO: {
            if (!state.media.isLive) {
                provider.seekTo(action.payload);
                if (action.payload >= state.metaMedia.metas.length) store.dispatch(resetMedia());
            }
            break;
        }
        case SEEK_NEXT_SEC: {
            if (!state.media.isLive) {
                let seekTime = state.media.time + action.payload;
                if (seekTime > state.metaMedia.metas.length) seekTime = state.metaMedia.metas.length;
                store.dispatch(seekTo(seekTime));
            }
            break;
        }
        case SEEK_PREVIOUS_SEC: {
            if (!state.media.isLive) {
                let seekTime = state.media.time - action.payload;
                if (seekTime < 0) seekTime = 0;
                store.dispatch(seekTo(seekTime));
            }
            break;
        }
        case MEDIA_PLAYING: {
            provider.mediaPlaying();
            break;
        }
        case MEDIA_ERROR: {
            provider.mediaError(action.payload);
            break;
        }
        case PAUSE_MEDIA: {
            provider.pauseMedia();
            break;
        }
        case SUBTITLES_TOGGLE: {
            action.payload.state ? provider.activateSubtitles() : provider.deactivateSubtitles();
            setLocalStorage(SUBTITLES, action.payload.state);
            break;
        }
        case SET_PROVIDER_BITRATE: {
            setProviderBitrate(provider, action.payload, (response) => {
                if (response) {
                    store.dispatch(setBitrate(action.payload));
                    store.dispatch(selectingBitrate(false));
                }
                next(action);
            });
            return;
        }
        case SET_VIDEO_DESCRIPTION: {
            action.payload ? provider.activateVideoDescription() : provider.deactivateVideoDescription();
        }
    }

    next(action);
};

/**
 * Select new bitrate
 * @param {object} provider - Video provider
 * @param {object} selectedBitrate - Index and text of the selected element in the bitrates array
 * @param {function} next - callback
 */
function setProviderBitrate(provider, selectedBitrate, next) {
    let currentBitrateIndex = provider.getCurrentBitrate();
    if (Number(selectedBitrate.bitrateindex) !== currentBitrateIndex) {
        provider.setBitrate(Number(selectedBitrate.bitrateindex)).then(next);
    }
}
