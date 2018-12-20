import { ON_ERROR } from '../../constants/action-types';

export function emitError(error) {
    return {
        type: ON_ERROR,
        payload: error
    };
}