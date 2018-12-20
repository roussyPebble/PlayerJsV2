import expect from 'expect';
import * as metaMediaAction from './index';

describe('Meta media Actions', function() {

    it('Should return action.type = SET_MEDIA_INFO', function() {
        let mockMedia = {idMedia:'35', appcode:'medianet'};
        let action = metaMediaAction.setMediaInfo(mockMedia.idMedia, mockMedia.appcode);
        expect(action.type).toBe('SET_MEDIA_INFO');
    });

    it('Should return action.type = SET_META_MEDIA', function() {
        let metas = {};
        let action = metaMediaAction.setMetaMedia(metas);
        expect(action.type).toBe('SET_META_MEDIA');
    });

});
