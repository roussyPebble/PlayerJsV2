import expect from 'expect';
import reducer from './index';
import InitialState from '../../store/initialState';
import {MEDIA_TIME_UPDATE, PLAY_MEDIA, RESET_MEDIA, SET_MEDIA_INFO, SET_META_MEDIA} from '../../constants/action-types';

describe('Media reducer', function() {
    it('Should set idMedia and appcode for action SET_MEDIA_INFO', function() {
        let action = {
            type: SET_MEDIA_INFO,
            payload: {
                idMedia: '26',
                appCode: 'medianetlive'
            }
        };
        let result = reducer(InitialState.media, action);
        expect(result.idMedia).toEqual('26');
        expect(result.appCode).toEqual('medianetlive');
        expect(result.isLive).toEqual(false);
    });

    it('Should set subtitleUrl and isLive for action SET_META_MEDIA', function() {
        let action = {
            type: SET_META_MEDIA,
            payload: {
                subtitlesUrl: '',
                SrcAvDiffusion: 'direct'
            }
        };
        let result = reducer(InitialState.media, action);
        expect(result.idMedia).toBeNull();
        expect(result.isLive).toBeTruthy();
        expect(result.subtitlesUrl).toBeNull();
    });

    it('Should set time for action MEDIA_TIME_UPDATE', function() {
        let action = {
            type: MEDIA_TIME_UPDATE,
            payload: 500
        };
        let result = reducer(InitialState.media, action);
        expect(result.time).toBe(500);
    });

    it('Should set time for action PLAY_MEDIA', function() {
        let action = {
            type: PLAY_MEDIA
        };
        let result = reducer(InitialState.media, action);
        expect(result.restoring).toBe(false);
        expect(result.restoringTime).toBe(null);
    });

    it('Should set time for action RESET_MEDIA without restoring time', function() {
        let action = {
            type: RESET_MEDIA
        };
        let result = reducer(InitialState.media, action);
        expect(result.restoring).toBe(false);
        expect(result.restoringTime).toBe(undefined);
    });

    it('Should set time for action RESET_MEDIA with restoring time', function() {
        let action = {
            type: RESET_MEDIA,
            payload: 500
        };
        let result = reducer(InitialState.media, action);
        expect(result.restoring).toBe(true);
        expect(result.restoringTime).toBe(500);
    });

    it('Should return default state', function() {
        let action = {
            type: null
        };
        let result = reducer(InitialState.media, action);
        expect(result).toEqual(InitialState.media);
    });
});
