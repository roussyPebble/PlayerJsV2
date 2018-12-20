import InitialState from '../../store/initialState';
import { EMIT_EVENT } from '../../constants/action-types';

export default function reducer(state = InitialState.event, action) {
    switch (action.type) {
        case EMIT_EVENT: {
            return {
                ...state,
                name: action.payload.name,
                timestamp: (new Date()).getTime(),
                data: action.payload.data
            };
        }
        default:
            return state;
    }
}
