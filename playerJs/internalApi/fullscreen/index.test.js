import expect from 'expect';
import * as fullscreenApi from './index';

describe('Fullscreen internal API', function() {
    it('Should return browser specific method', function() {
        let methods = fullscreenApi.userAgentSpecificMethod();
        expect(methods).toHaveProperty('exitFullscreen', 'exitFullscreen');
        expect(methods).toHaveProperty('fullscreenElement', 'fullscreenElement');
    });
});