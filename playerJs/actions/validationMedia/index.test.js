import expect from 'expect';
import * as validationMediaAction from './index';

describe('Validation media actions', function() {
    it('Should return action.type = ON_VALIDATION_MEDIA_COMPLETED', function() {
        let mockMedia = {
            idMedia: null,
            appCode: null,
            isLive: false
        };
        let action = validationMediaAction.onValidationMediaCompleted(mockMedia, true);
        expect(action.type).toBe('ON_VALIDATION_MEDIA_COMPLETED');
        expect(action.payload.isPlaying).toBeTruthy();
    });
});