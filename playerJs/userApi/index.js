import { playMediaApi, pauseMediaApi, setReducedApi } from './ui';

export const API = (store) => {
    return {
        play: () => {
            playMediaApi(store);
        },
        pause: () => {
            pauseMediaApi(store);
        },
        setReduceMode: (reduced) => {
            setReducedApi(store, reduced);
        }
    };
};