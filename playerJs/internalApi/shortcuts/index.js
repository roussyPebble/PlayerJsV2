/**
 * Shortcuts internal API
 * @module Shortcuts internal API
 */
import { mute, unmute, playMedia, pauseMedia, enterFullscreen, exitFullscreen, subtitlesToggle } from '../../actions/ui';

/**
 * @description Initiate the shortcuts
 */
export function initShortcuts(store) {
    return ((store) => {
        document.addEventListener('keydown', (event) => {
            let state = store.getState();
            if (state.playerState.infoDisplayed) return;
            manageShortcuts(event.keyCode, state);
        });

        /**
         * @description Manage the keydown
         * @param {int} key - The pressed key code
         * @param {object} state - The playerState object
         */
        function manageShortcuts(key, state) {
            switch (key) {
                // Space bar play/pause
                case 32:
                    if (event.target.tagName !== 'BUTTON') handlePlayPauseShortcut(state);
                    break;
                // k play/pause
                case 75:
                    handlePlayPauseShortcut(state);
                    break;
                // Mute
                case 77:
                    state.playerState.volume.mute ? store.dispatch(unmute(state.playerState.volume.level)) : store.dispatch(mute(state.playerState.volume.level));
                    break;
                // fullscreen
                case 70:
                    handleFullscreen(state.playerState.fullscreen);
                    break;
                // subtitles
                case 67:
                    handleSubtitles(state.providers.subtitlesActive, state.providers.subtitlesUrl);
                    break;
                default:
                    break;
            }
        }

        /**
         * @description Handle shortcuts for subtitle
         * @param {bool} isActive - Is subtitles track currently active
         * @param {*} track - The vtt url
         */
        function handleSubtitles(isActive, track) {
            let flag = !isActive;
            store.dispatch(subtitlesToggle(flag, track));
        }

        /**
         * @description Handle the play and pause shortcuts
         * @param {object} state - The current state of the player
         */
        function handlePlayPauseShortcut(state) {
            if (state.playerState.playing) {
                store.dispatch(pauseMedia());
            } else {
                store.dispatch(playMedia());
            }
        }

        /**
         * @description Handle fullscreen shortcuts and double click fullscreen
         * @param {bool} isFullscreen - Flag to check if the player is in fullscreen
         */
        function handleFullscreen(isFullscreen) {
            isFullscreen ? store.dispatch(exitFullscreen()) : store.dispatch(enterFullscreen());
        }
    })(store);
}