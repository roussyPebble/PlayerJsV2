import expect from 'expect';
import * as mediaActions from './index';

describe('Media Actions', function() {
    it('Should return action.type = INIT_MEDIA', function() {
        let mockMedia = {idMedia:'35', appcode:'medianet'};
        let action = mediaActions.initMedia(mockMedia);
        expect(action.type).toBe('INIT_MEDIA');
    });

    it('Should return action.type = MEDIA_PLAYING', function() {
        let action = mediaActions.mediaPlaying();
        expect(action.type).toBe('MEDIA_PLAYING');
    });

    it('Should return action.type = SEEKING', function() {
        let action = mediaActions.seeking(true);
        expect(action.type).toBe('SEEKING');
        expect(action.payload).toBeTruthy();
    });

    it('Should return action.type = MEDIA_TIME_UPDATE', function() {
        let action = mediaActions.mediaTimeUpdate(10);
        expect(action.type).toBe('MEDIA_TIME_UPDATE');
        expect(action.payload).toBe(10);
    });
});
