import { detect } from 'detect-browser';
import { idBrowser, windowStorageSet } from '../actions/configurations';
import { setWindowStorage } from '../helpers/window';

export default function initConfigurations(store) {
    detectBrowser(store);
    initWindowStorage(store);
}

function detectBrowser(store) {
    let infos = detect();
    store.dispatch(idBrowser(infos));
}

function initWindowStorage(store) {
    let state = store.getState();
    let uuid = state.playerState.uuid;
    setWindowStorage(uuid);
    store.dispatch(windowStorageSet());
}