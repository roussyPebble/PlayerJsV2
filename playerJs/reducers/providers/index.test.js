import expect from 'expect';
import reducer from './index';
import InitialState from '../../store/initialState';
import { LOAD_LOCALSTORAGE, SET_META_MEDIA, ON_VALIDATION_MEDIA_COMPLETED, PAUSE_MEDIA, PLAY_MEDIA, SUBTITLES_TOGGLE, SET_BITRATE } from '../../constants/action-types';

describe('Providers reducer', function() {
    it('Should set subtitlesActive for action LOAD_LOCALSTORAGE', function() {
        let action = {
            type: LOAD_LOCALSTORAGE,
            payload: {
                subtitlesActive: true
            }
        };
        let result = reducer(InitialState.providers, action);
        expect(result.subtitlesActive).toEqual(true);
    });

    it('Should set type, isLive and subtitlesUrl for action SET_META_MEDIA', function() {
        let action = {
            type: SET_META_MEDIA,
            payload: {}
        };
        let result = reducer(InitialState.providers, action);
        expect(result.type).toEqual('html');
        expect(result.isLive).toEqual(false);
        expect(result.subtitlesUrl).toEqual(null);
    });

    it('Should set type, isLive and subtitlesUrl for action SET_META_MEDIA', function() {
        let action = {
            type: SET_META_MEDIA,
            payload: {
                providerId: 'hls',
                SrcAvDiffusion: 'direct',
                closedCaption: 'http://'
            }
        };
        let result = reducer(InitialState.providers, action);
        expect(result.type).toEqual('hls');
        expect(result.isLive).toEqual(true);
        expect(result.subtitlesUrl).toEqual('http://');
    });

    it('Should set providerReady for action ON_VALIDATION_MEDIA_COMPLETED', function() {
        let action = {
            type: ON_VALIDATION_MEDIA_COMPLETED,
            payload: true
        };
        let result = reducer(InitialState.providers, action);
        expect(result.providerReady).toEqual(true);
    });

    it('Should set mediaPlaying for action PAUSE_MEDIA', function() {
        let action = {
            type: PAUSE_MEDIA
        };
        let result = reducer(InitialState.providers, action);
        expect(result.mediaPlaying).toEqual(false);
    });

    it('Should set mediaPlaying for action PLAY_MEDIA', function() {
        let action = {
            type: PLAY_MEDIA
        };
        let result = reducer(InitialState.providers, action);
        expect(result.mediaPlaying).toEqual(true);
    });

    it('Should set subtitlesActive for action SUBTITLES_TOGGLE', function() {
        let action = {
            type: SUBTITLES_TOGGLE,
            payload: {
                state: true
            }
        };
        let result = reducer(InitialState.providers, action);
        expect(result.subtitlesActive).toEqual(true);
    });

    it('Should set currentBitrate for action SET_BITRATE', function() {
        let action = {
            type: SET_BITRATE,
            payload: {
                index: 6,
                text: '540p'
            }
        };
        let result = reducer(InitialState.providers, action);
        expect(result.currentBitrate.bitrate).toEqual(6);
        expect(result.currentBitrate.lines).toEqual('540p');
    });

    it('Should return default state', function() {
        let action = {
            type: null
        };
        let result = reducer(InitialState.providers, action);
        expect(result).toEqual(InitialState.providers);
    });
});
