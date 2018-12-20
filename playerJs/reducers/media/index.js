import InitialState from '../../store/initialState';
import {PLAY_MEDIA, SET_MEDIA_INFO, SET_META_MEDIA, RESET_MEDIA, MEDIA_TIME_UPDATE} from '../../constants/action-types';

export default function reducer(state = InitialState.media, action) {
    switch (action.type) {
        case SET_MEDIA_INFO: {
            return {
                ...state,
                idMedia: action.payload.idMedia,
                appCode: action.payload.appCode
            };
        }
        case SET_META_MEDIA: {
            return {
                ...state,
                subtitlesUrl: action.payload.closedCaption || null,
                isLive: action.payload.SrcAvDiffusion === 'direct'
            };
        }
        case PLAY_MEDIA: {
            return {
                ...state,
                restoring: false,
                restoringTime: null
            };
        }
        case RESET_MEDIA: {
            return {
                ...state,
                restoring: action.payload != null || state.isLive,
                restoringTime: action.payload
            };
        }
        case MEDIA_TIME_UPDATE: {
            return {
                ...state,
                time: action.payload
            };
        }
        default:
            return state;
    }
}
