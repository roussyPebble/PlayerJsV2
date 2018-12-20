import { ID_BROWSER, SET_WINDOW_STORAGE } from '../../constants/action-types';

export function idBrowser(info) {
    return {
        type: ID_BROWSER,
        payload: info
    };
}

export function windowStorageSet() {
    return {
        type: SET_WINDOW_STORAGE,
        payload: true
    };
}