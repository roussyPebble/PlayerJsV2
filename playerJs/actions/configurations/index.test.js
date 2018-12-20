import expect from 'expect';
import * as configActions from './index';
import InitialState from '../../store/initialState';

describe('Configuration Actions', function() {
    it('Should return action.type = ID_BROWSER with good payload', function() {
        let action = configActions.idBrowser(InitialState.configurations.browser);
        expect(action.type).toBe('ID_BROWSER');
        expect(action.payload).toEqual(InitialState.configurations.browser);
    });
});
