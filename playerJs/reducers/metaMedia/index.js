import InitialState from '../../store/initialState';
import { SET_META_MEDIA } from '../../constants/action-types';

export default function reducer(state = InitialState.metaMedia, action) {
    switch (action.type) {
        case SET_META_MEDIA: {
            return {
                ...state,
                metaLoaded: true,
                metas: action.payload
            };
        }
        default:
            return state;
    }
}
