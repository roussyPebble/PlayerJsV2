import expect from 'expect';
import { REDUCED } from '../../constants/events';
import * as eventsActions from './index';

describe('PlayerState events', function() {
    it('Should return event REDUCED', function() {
        let action = eventsActions.onReduced(true);
        expect(action.type).toBe('EMIT_EVENT');
        expect(action.payload.name).toBe(REDUCED);
        expect(action.payload.data).toBe(true);
    });
});
