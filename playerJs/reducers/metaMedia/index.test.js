import expect from 'expect';
import reducer from './index';
import InitialState from '../../store/initialState';
import { SET_META_MEDIA } from '../../constants/action-types';

describe('Meta media reducer', function() {
    it('Should set metas to an empty array and metaLoaded to true', function() {
        let action = {
            type: SET_META_MEDIA,
            payload: []
        };
        let result = reducer(InitialState.metaMedia, action);
        expect(result.metaLoaded).toBeTruthy();
        expect(result.metas).toHaveLength(0);
    });

    it('Should return default state', function() {
        let action = {
            type: null
        };
        let result = reducer(InitialState.metaMedia, action);
        expect(result).toEqual(InitialState.metaMedia);
    });
});