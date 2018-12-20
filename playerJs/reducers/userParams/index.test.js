import expect from 'expect';
import reducer from './index';
import InitialState from '../../store/initialState';
import { SET_USER_PARAMS } from '../../constants/action-types';

describe('User params reducer', function() {
    it('Should return user defined params', function() {
        let action = {
            type: SET_USER_PARAMS,
            payload: {autoplay: true}
        };
        let result = reducer(InitialState.userParams, action);
        expect(result.integrationParams).toEqual(action.payload);
    });

    it('Should return default state', function() {
        let action = {
            type: null
        };
        let result = reducer(InitialState.userParams, action);
        expect(result).toEqual(InitialState.userParams);
    });
});