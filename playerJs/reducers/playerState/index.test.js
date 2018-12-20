import expect from 'expect';
import reducer from './index';
import InitialState from '../../store/initialState';
import {
    A11Y_FOCUS, INIT_MEDIA, RESET_MEDIA, PAUSE_MEDIA, PLAY_MEDIA, PLAYER_IS_HOVER, SET_PLAYER_SIZE, ENTER_FULLSCREEN, EXIT_FULLSCREEN,
    MUTE, UNMUTE, VOLUME_BUTTON_IS_HOVER, VOLUME_CHANGED, SELECTING_BITRATE, SET_VIDEO_DESCRIPTION, SET_META_MEDIA, MEDIA_PLAYING,
    LOAD_LOCALSTORAGE, SEEKING, SET_REDUCED, DISPLAY_INFO, SHOW_THUMBNAIL, HIDE_THUMBNAIL }
    from '../../constants/action-types';

describe('PlayerState reducer', function() {
    it('Should set volume and videoDescriptionActive for action LOAD_LOCALSTORAGE', function() {
        let action = {
            type: LOAD_LOCALSTORAGE,
            payload: {
                mute: true,
                volume: 0.7,
                videoDescriptionActive: true
            }
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.volume.mute).toEqual(true);
        expect(result.volume.level).toEqual(0.7);
        expect(result.videoDescriptionActive).toEqual(true);
    });

    it('Should set playing, playedOnce and isReady for action RESET_MEDIA', function() {
        let action = {
            type: RESET_MEDIA
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.playing).toEqual(false);
        expect(result.playedOnce).toEqual(false);
        expect(result.isReady).toEqual(false);
    });

    it('Should set playing, playedOnce and isReady for action INIT_MEDIA', function() {
        let action = {
            type: INIT_MEDIA
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.playing).toEqual(true);
        expect(result.playedOnce).toEqual(true);
        expect(result.isReady).toEqual(false);
    });

    it('Should set playing for action PAUSE_MEDIA', function() {
        let action = {
            type: PAUSE_MEDIA
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.playing).toEqual(false);
    });

    it('Should set playing for action PLAY_MEDIA', function() {
        let action = {
            type: PLAY_MEDIA
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.playing).toEqual(true);
        expect(result.playedOnce).toEqual(true);
        expect(result.infoDisplayed).toEqual(false);
    });

    it('Should set ctrlKeyboardFocused for action A11Y_FOCUS', function() {
        let action = {
            type: A11Y_FOCUS,
            payload: true
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.ctrlKeyboardFocused).toEqual(true);
    });

    it('Should set mouseOver for action PLAYER_IS_HOVER', function() {
        let action = {
            type: PLAYER_IS_HOVER,
            payload: {
                mouseIn: true
            }
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.mouseOver).toEqual(true);
    });

    it('Should set sizes for action SET_PLAYER_SIZE', function() {
        let action = {
            type: SET_PLAYER_SIZE,
            payload: {
                width: 100,
                height: 100
            }
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.sizes.width).toEqual(100);
        expect(result.sizes.height).toEqual(100);
    });

    it('Should set fullscreen for action ENTER_FULLSCREEN', function() {
        let action = {
            type: ENTER_FULLSCREEN,
            payload: true
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.fullscreen).toEqual(true);
    });

    it('Should set fullscreen for action EXIT_FULLSCREEN', function() {
        let action = {
            type: EXIT_FULLSCREEN,
            payload: false
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.fullscreen).toEqual(false);
    });

    it('Should set volume for action MUTE', function() {
        let action = {
            type: MUTE,
            payload: 0.7
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.volume.mute).toEqual(true);
        expect(result.volume.level).toEqual(0.7);
    });

    it('Should set volume for action UNMUTE', function() {
        let action = {
            type: UNMUTE,
            payload: 0.7
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.volume.mute).toEqual(false);
        expect(result.volume.level).toEqual(0.7);
    });

    it('Should set volume for action VOLUME_BUTTON_IS_HOVER', function() {
        let action = {
            type: VOLUME_BUTTON_IS_HOVER,
            payload: true
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.volume.btnIsHover).toEqual(true);
    });

    it('Should set volume for action VOLUME_CHANGED', function() {
        let action = {
            type: VOLUME_CHANGED,
            payload: 0.7
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.volume.level).toEqual(0.7);
    });

    it('Should set isReady for action SEEKING', function() {
        let action = {
            type: SEEKING,
            payload: true
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.isReady).toEqual(false);
    });

    it('Should set selectingBitrate for action SELECTING_BITRATE', function() {
        let action = {
            type: SELECTING_BITRATE,
            payload: {
                selectingBitrate: true
            }
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.selectingBitrate).toEqual(true);
    });

    it('Should set videoDescriptionActive for action SET_VIDEO_DESCRIPTION', function() {
        let action = {
            type: SET_VIDEO_DESCRIPTION,
            payload: true
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.videoDescriptionActive).toEqual(true);
    });

    it('Should set isReady for action MEDIA_PLAYING', function() {
        let action = {
            type: MEDIA_PLAYING
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.isReady).toEqual(true);
    });

    it('Should set isReady for action SET_META_MEDIA', function() {
        let action = {
            type: SET_META_MEDIA
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.isReady).toEqual(true);
    });

    it('Should set reduced for action SET_REDUCED', function() {
        let action = {
            type: SET_REDUCED,
            payload: true
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.reduced).toEqual(true);
    });

    it('Should set infoDisplayed for action DISPLAY_INFO', function() {
        let action = {
            type: DISPLAY_INFO,
            payload: true
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.infoDisplayed).toEqual(true);
    });

    it('Should set thumbnail for action SHOW_THUMBNAIL', function() {
        let action = {
            type: SHOW_THUMBNAIL,
            payload: {
                mediaPosition: 0.1,
                xPosition: 100,
                yPosition: 200
            }
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.thumbnail.mediaPosition).toEqual(0.1);
        expect(result.thumbnail.xPosition).toEqual(100);
        expect(result.thumbnail.yPosition).toEqual(200);
    });

    it('On action SHOW_THUMBNAIL, do not allow media position to be lower than 0', function() {
        let action = {
            type: SHOW_THUMBNAIL,
            payload: {
                mediaPosition: -10,
                xPosition: 100,
                yPosition: 200
            }
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.thumbnail.mediaPosition).toEqual(0);
        expect(result.thumbnail.xPosition).toEqual(100);
        expect(result.thumbnail.yPosition).toEqual(200);
    });

    it('On action SHOW_THUMBNAIL, do not allow media position to be greater than 1', function() {
        let action = {
            type: SHOW_THUMBNAIL,
            payload: {
                mediaPosition: 10,
                xPosition: 100,
                yPosition: 200
            }
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.thumbnail.mediaPosition).toEqual(1);
        expect(result.thumbnail.xPosition).toEqual(100);
        expect(result.thumbnail.yPosition).toEqual(200);
    });

    it('Should set thumbnail for action HIDE_THUMBNAIL', function() {
        let action = {
            type: HIDE_THUMBNAIL
        };
        let result = reducer(InitialState.playerState, action);
        expect(result.thumbnail.mediaPosition).toEqual(-1);
        expect(result.thumbnail.xPosition).toEqual(-1);
        expect(result.thumbnail.yPosition).toEqual(-1);
    });

    it('Should return default state', function() {
        let action = {
            type: null
        };
        let result = reducer(InitialState.playerState, action);
        expect(result).toEqual(InitialState.playerState);
    });
});
