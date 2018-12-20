import InitialState from '../../store/initialState';
import { SET_META_MEDIA, ID_BROWSER, SET_WINDOW_STORAGE } from '../../constants/action-types';

export default function reducer(state = InitialState.configurations, action) {
    switch (action.type) {
        case SET_META_MEDIA: {
            return {
                ...state,
                teaser: action.payload.imageHR || state.teaser
            };
        }
        case ID_BROWSER: {
            return {
                ...state,
                browser: action.payload
            };
        }
        case SET_WINDOW_STORAGE: {
            return {
                ...state,
                windowStorageReady: action.payload
            };
        }
        default:
            return state;
    }
}
