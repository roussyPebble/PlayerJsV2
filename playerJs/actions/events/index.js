import { EMIT_EVENT } from '../../constants/action-types';

export function emitEvent(name, data = null) {
    return {
        type: EMIT_EVENT,
        payload: {
            name,
            data
        }
    };
}