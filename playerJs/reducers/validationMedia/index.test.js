import expect from 'expect';
import reducer from './index';
import InitialState from '../../store/initialState';
import { INIT_MEDIA, ON_VALIDATION_MEDIA_COMPLETED } from '../../constants/action-types';

describe('Validation media reducer', function() {
    it('Should return values for action INIT_MEDIA', function() {
        let action = {
            type: INIT_MEDIA
        };
        let result = reducer(InitialState.validationMedia, action);
        expect(result.dataLoaded).toEqual('inProgress');
    });

    it('Should set dataLoaded and bitrates for action ON_VALIDATION_MEDIA_COMPLETED', function() {
        let action = {
            type: ON_VALIDATION_MEDIA_COMPLETED,
            payload: {
                vmData: {
                    bitrates: [
                        {
                            'bitrate': 2500,
                            'width': 852,
                            'height': 480,
                            'lines': '720p',
                            'param': null
                        },
                        {
                            'bitrate': 1800,
                            'width': 852,
                            'height': 480,
                            'lines': '540p',
                            'param': null
                        },
                        {
                            'bitrate': 1100,
                            'width': 852,
                            'height': 480,
                            'lines': '480p',
                            'param': null
                        },
                        {
                            'bitrate': 700,
                            'width': 640,
                            'height': 360,
                            'lines': '360p',
                            'param': null
                        },
                        {
                            'bitrate': 400,
                            'width': 400,
                            'height': 224,
                            'lines': '240p',
                            'param': null
                        },
                        {
                            'bitrate': 256,
                            'width': 400,
                            'height': 224,
                            'lines': '224p',
                            'param': null
                        }
                    ]
                }
            }
        };
        let result = reducer(InitialState.validationMedia, action);
        expect(result.dataLoaded).toEqual(true);
        expect(result.bitrates.length).toEqual(7);
    });

    it('Should return default state', function() {
        let action = {
            type: null
        };
        let result = reducer(InitialState.validationMedia, action);
        expect(result).toEqual(InitialState.validationMedia);
    });
});