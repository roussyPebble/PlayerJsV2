import expect from 'expect';
import reducer from './index';
import InitialState from '../../store/initialState';
import { EMIT_EVENT } from '../../constants/action-types';

describe('Event reducer', function() {
    it('Should set name and data for action EMIT_EVENT', function() {
        let action = {
            type: EMIT_EVENT,
            payload: {
                name: 'event_name',
                data: 'event_data'
            }
        };
        let result = reducer(InitialState.event, action);
        expect(result.name).toEqual('event_name');
        expect(result.data).toEqual('event_data');
    });

    it('Should return default state', function() {
        let action = {
            type: null
        };
        let result = reducer(InitialState.event, action);
        expect(result).toEqual(InitialState.event);
    });
});
