import InitialState from '../../store/initialState';
import { LOAD_LOCALSTORAGE, SET_META_MEDIA, ON_VALIDATION_MEDIA_COMPLETED, PAUSE_MEDIA, PLAY_MEDIA, SUBTITLES_TOGGLE, SET_BITRATE } from '../../constants/action-types';

export default function reducer(state = InitialState.providers, action) {
    switch (action.type) {
        case LOAD_LOCALSTORAGE: {
            return {
                ...state,
                subtitlesActive: action.payload.subtitlesActive === true
            };
        }
        case SET_META_MEDIA: {
            return {
                ...state,
                type: action.payload.providerId || 'html',
                isLive: action.payload.SrcAvDiffusion === 'direct' || false,
                subtitlesUrl: action.payload.closedCaption || null
            };
        }
        case ON_VALIDATION_MEDIA_COMPLETED: {
            return {
                ...state,
                providerReady: action.payload
            };
        }
        case PAUSE_MEDIA: {
            return {
                ...state, mediaPlaying: false
            };
        }
        case PLAY_MEDIA: {
            return {
                ...state, mediaPlaying: true
            };
        }
        case SUBTITLES_TOGGLE: {
            return {
                ...state,
                subtitlesActive: action.payload.state
            };
        }
        case SET_BITRATE: {
            let bitrate = {
                bitrate: action.payload.index,
                lines: action.payload.text
            };
            return {
                ...state,
                currentBitrate: bitrate
            };
        }
        default:
            return state;
    }
}
