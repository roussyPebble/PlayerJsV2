import { LOAD_LOCALSTORAGE } from '../../constants/action-types';

export function loadLocalStorage() {
    return {
        type: LOAD_LOCALSTORAGE
    };
}