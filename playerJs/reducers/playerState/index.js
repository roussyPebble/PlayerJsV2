import InitialState from '../../store/initialState';
import {
    A11Y_FOCUS, INIT_MEDIA, RESET_MEDIA, PAUSE_MEDIA, PLAY_MEDIA, PLAYER_IS_HOVER, SET_PLAYER_SIZE, ENTER_FULLSCREEN, EXIT_FULLSCREEN,
    MUTE, UNMUTE, VOLUME_BUTTON_IS_HOVER, VOLUME_CHANGED, SELECTING_BITRATE, SET_VIDEO_DESCRIPTION, SET_META_MEDIA, MEDIA_PLAYING,
    LOAD_LOCALSTORAGE, SEEKING, SET_REDUCED, ON_ERROR, ON_VALIDATION_MEDIA_COMPLETED, DISPLAY_INFO, SHOW_THUMBNAIL, HIDE_THUMBNAIL }
    from '../../constants/action-types';

export default function reducer(state = InitialState.playerState, action) {
    switch (action.type) {
        case LOAD_LOCALSTORAGE: {
            return {
                ...state,
                volume: {
                    mute: action.payload.mute,
                    level: action.payload.volume,
                    btnIsHover: state.volume.btnIsHover
                },
                videoDescriptionActive: action.payload.videoDescriptionActive === true
            };
        }
        case RESET_MEDIA: {
            return {
                ...state,
                playing: false,
                playedOnce: false,
                isReady: false
            };
        }
        case INIT_MEDIA: {
            return {
                ...state,
                playing: true,
                playedOnce: true,
                isReady: false
            };
        }
        case PAUSE_MEDIA: {
            return {
                ...state, playing: false
            };
        }
        case PLAY_MEDIA: {
            return {
                ...state,
                playing: true,
                playedOnce: true,
                infoDisplayed: false
            };
        }
        case A11Y_FOCUS: {
            return {
                ...state, ctrlKeyboardFocused: action.payload
            };
        }
        case PLAYER_IS_HOVER: {
            return {
                ...state,
                mouseOver: action.payload.mouseIn
            };
        }
        case SET_PLAYER_SIZE: {
            return {
                ...state,
                sizes: action.payload
            };
        }
        case ENTER_FULLSCREEN: {
            return {
                ...state,
                fullscreen: action.payload === true
            };
        }
        case EXIT_FULLSCREEN: {
            return {
                ...state,
                fullscreen: action.payload === true
            };
        }
        case MUTE: {
            return {
                ...state,
                volume: {
                    mute: true,
                    level: action.payload,
                    btnIsHover: state.volume.btnIsHover
                }
            };
        }
        case UNMUTE: {
            return {
                ...state,
                volume: {
                    mute: false,
                    level: action.payload,
                    btnIsHover: state.volume.btnIsHover
                }
            };
        }
        case VOLUME_BUTTON_IS_HOVER: {
            let volume = state.volume;
            return {
                ...state,
                volume: {
                    mute: volume.mute,
                    level: volume.level,
                    btnIsHover: action.payload
                }
            };
        }
        case VOLUME_CHANGED: {
            return {
                ...state,
                volume: {
                    mute: false,
                    level: action.payload
                }
            };
        }
        case SEEKING: {
            return {
                ...state,
                isReady: !action.payload
            };
        }
        case SELECTING_BITRATE: {
            return {
                ...state,
                selectingBitrate: action.payload.selectingBitrate
            };
        }
        case SET_VIDEO_DESCRIPTION: {
            return {
                ...state,
                videoDescriptionActive: action.payload
            };
        }
        case MEDIA_PLAYING:
        case SET_META_MEDIA: {
            return {
                ...state,
                isReady: true
            };
        }
        case SET_REDUCED: {
            return {
                ...state,
                reduced: action.payload
            };
        }
        case ON_ERROR: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ON_VALIDATION_MEDIA_COMPLETED: {
            return {
                ...state,
                error: InitialState.playerState.error
            };
        }
        case DISPLAY_INFO: {
            return {
                ...state,
                infoDisplayed: action.payload
            };
        }
        case SHOW_THUMBNAIL: {
            if (action.payload.mediaPosition < 0) action.payload.mediaPosition = 0;
            if (action.payload.mediaPosition > 1) action.payload.mediaPosition = 1;
            return {
                ...state,
                thumbnail: {
                    mediaPosition: action.payload.mediaPosition,
                    xPosition: action.payload.xPosition,
                    yPosition: action.payload.yPosition
                }
            };
        }
        case HIDE_THUMBNAIL: {
            return {
                ...state,
                thumbnail: {
                    mediaPosition: InitialState.playerState.thumbnail.mediaPosition,
                    xPosition: InitialState.playerState.thumbnail.xPosition,
                    yPosition: InitialState.playerState.thumbnail.yPosition
                }
            };
        }
        default:
            return state;
    }
}
