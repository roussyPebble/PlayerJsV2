import expect from 'expect';
import * as eventsActions from './index';

describe('Events Actions', function() {
    it('Should return action.type = EMIT_EVENT', function() {
        let action = eventsActions.emitEvent('event_name', 'event_data');
        expect(action.type).toBe('EMIT_EVENT');
        expect(action.payload.name).toBe('event_name');
        expect(action.payload.data).toBe('event_data');
    });
});
