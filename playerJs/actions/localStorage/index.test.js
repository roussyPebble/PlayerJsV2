import expect from 'expect';
import * as localStorageActions from './index';

describe('Local Storage Actions', function() {
    it('Should return action.type = LOAD_LOCALSTORAGE', function() {
        let action = localStorageActions.loadLocalStorage();
        expect(action.type).toBe('LOAD_LOCALSTORAGE');
    });
});
