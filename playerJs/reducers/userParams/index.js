import InitialState from '../../store/initialState';
import { SET_USER_PARAMS } from '../../constants/action-types';

export default function reducer(state = InitialState.userParams, action) {
    switch (action.type) {
        case SET_USER_PARAMS: {
            return {
                ...state,
                integrationParams: action.payload
            };
        }
        default:
            return state;
    }
}
