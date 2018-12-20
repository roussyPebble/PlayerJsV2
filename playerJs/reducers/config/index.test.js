import expect from 'expect';
import { SET_META_MEDIA, ID_BROWSER } from '../../constants/action-types';
import InitialState from '../../store/initialState';
import reducer from './index';

describe('Configuration reducer', function() {
    it('Should return default teaser and width', function() {
        let mockAction = {
            type: SET_META_MEDIA,
            payload: {
                imageHR: ''
            }
        };
        let result = reducer(InitialState.configurations, mockAction);
        expect(result.width).toEqual(InitialState.configurations.width);
        expect(result.teaser).toEqual(InitialState.configurations.teaser);
    });

    it('Should return browser infos', function() {
        let mockAction = {
            type: ID_BROWSER,
            payload: InitialState.configurations.browser
        };
        let result = reducer(InitialState.configurations, mockAction);
        expect(result.browser).toEqual(InitialState.configurations.browser);
    });
});
