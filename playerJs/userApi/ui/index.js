import { playMedia, pauseMedia, setReduced } from '../../actions/ui';

export function playMediaApi(store) {
    store.dispatch(playMedia());
}

export function pauseMediaApi(store) {
    store.dispatch(pauseMedia());
}

export function setReducedApi(store, isReduced) {
    store.dispatch(setReduced(isReduced));
}