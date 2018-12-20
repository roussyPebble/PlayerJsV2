import expect from 'expect';
import * as uiActions from './index';

describe('UI Actions', function() {

    it('Should return action.type = PAUSE_MEDIA', function() {
        let action = uiActions.pauseMedia();
        expect(action.type).toBe('PAUSE_MEDIA');
    });

    it('Should return action.type = PLAY_MEDIA', function() {
        let action = uiActions.playMedia();
        expect(action.type).toBe('PLAY_MEDIA');
    });

    it('Should return action.type = A11Y_FOCUS', function() {
        let action = uiActions.a11yFocus(true);
        expect(action.type).toBe('A11Y_FOCUS');
        expect(action.payload).toBeTruthy();
    });

    it('Should return action.type = PLAYER_IS_HOVER', function() {
        let action = uiActions.playerIsHover(true);
        expect(action.type).toBe('PLAYER_IS_HOVER');
        expect(action.payload.mouseIn).toBeTruthy();
    });

    it('Should return action.type = SET_PLAYER_SIZE', function() {
        let sizes = {
            width: 300,
            height: 300
        };
        let action = uiActions.setPlayerDimensions(sizes);
        expect(action.type).toBe('SET_PLAYER_SIZE');
    });

    it('Should return action.type = ENTER_FULLSCREEN', function() {
        let action = uiActions.enterFullscreen();
        expect(action.type).toBe('ENTER_FULLSCREEN');
    });

    it('Should return action.type = EXIT_FULLSCREEN', function() {
        let action = uiActions.exitFullscreen();
        expect(action.type).toBe('EXIT_FULLSCREEN');
    });

    it('Should return action.type = MUTE', function() {
        let action = uiActions.mute(30);
        expect(action.type).toBe('MUTE');
        expect(action.payload).toBe(30);
    });

    it('Should return action.type = UNMUTE', function() {
        let action = uiActions.unmute(30);
        expect(action.type).toBe('UNMUTE');
        expect(action.payload).toBe(30);
    });

    it('Should return action.type = VOLUME_CHANGED', function() {
        let action = uiActions.volumeChanged(30);
        expect(action.type).toBe('VOLUME_CHANGED');
        expect(action.payload).toBe(30);
    });

    it('Should return action.type = VOLUME_BUTTON_IS_HOVER', function() {
        let action = uiActions.volumeBtnHover(30);
        expect(action.type).toBe('VOLUME_BUTTON_IS_HOVER');
        expect(action.payload).toBe(30);
    });

    it('Should return action.type = SUBTITLES_TOGGLE', function() {
        let action = uiActions.subtitlesToggle(true, 'test');
        expect(action.type).toBe('SUBTITLES_TOGGLE');
        expect(action.payload.state).toBeTruthy();
    });

    it('Should return action.type = SET_PROVIDER_BITRATE', function() {
        let action = uiActions.setProviderBitrate(1);
        expect(action.type).toBe('SET_PROVIDER_BITRATE');
        expect(action.payload).toBe(1);
    });

    it('Should return action.type = SELECTING_BITRATE', function() {
        let action = uiActions.selectingBitrate(true);
        expect(action.type).toBe('SELECTING_BITRATE');
        expect(action.payload.selectingBitrate).toBeTruthy();
    });

    it('Should return action.type = SET_BITRATE', function() {
        let params = {
            bitrateindex: '1',
            lines: '240p'
        };
        let action = uiActions.setBitrate(params);
        expect(action.type).toBe('SET_BITRATE');
    });

    it('Should return action.type = SET_VIDEO_DESCRIPTION', function() {
        let action = uiActions.setVideoDescription(true);
        expect(action.type).toBe('SET_VIDEO_DESCRIPTION');
        expect(action.payload).toBeTruthy();
    });

    it('Should return action.type = SET_REDUCED', function() {
        let action = uiActions.setReduced(true);
        expect(action.type).toBe('SET_REDUCED');
        expect(action.payload).toBeTruthy();
    });

    it('Should return action.type = SEEK_NEXT_SEC', function() {
        let action = uiActions.seekNextSec(10);
        expect(action.type).toBe('SEEK_NEXT_SEC');
        expect(action.payload).toBe(10);
    });

    it('Should return action.type = SEEK_PREVIOUS_SEC', function() {
        let action = uiActions.seekPreviousSec(10);
        expect(action.type).toBe('SEEK_PREVIOUS_SEC');
        expect(action.payload).toBe(10);
    });

    it('Should return action.type = SHOW_THUMBNAIL', function() {
        let action = uiActions.showThumbnail(0.1, 100, 200);
        expect(action.type).toBe('SHOW_THUMBNAIL');
        expect(action.payload.mediaPosition).toBe(0.1);
        expect(action.payload.xPosition).toBe(100);
        expect(action.payload.yPosition).toBe(200);
    });

    it('Should return action.type = HIDE_THUMBNAIL', function() {
        let action = uiActions.hideThumbnail(true);
        expect(action.type).toBe('HIDE_THUMBNAIL');
    });
});
