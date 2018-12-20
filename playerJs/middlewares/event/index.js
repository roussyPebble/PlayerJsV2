/**
 * @module Event
 */
import { EMIT_EVENT } from '../../constants/action-types';
import {emitEvent} from '../../helpers/window';

/**
 * Event middleware
 * @param store
 * @returns {Function}
 */
export default store => next => action => {
    let state = store.getState();
    switch (action.type){
        case EMIT_EVENT: {
            emitEvent(state.playerState.uuid, action.payload.name, action.payload.data);
        }
    }

    next(action);
};