import expect from 'expect';
import * as userParams from './index';

describe('User Params action', function() {
    it('Should return action.type = SET_USER_PARAMS', function() {
        let params = {
            autoplay: true,
        };
        let action = userParams.setUserParams(params);
        expect(action.type).toBe('SET_USER_PARAMS');
        expect(action.payload.autoplay).toBeTruthy();
    });
});