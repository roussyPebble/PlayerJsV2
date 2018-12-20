import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Seekbar from './index';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../../store/initialState';
import extend from 'extend';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
let state = extend(InitialState, {});
let store = mockStore(state);
let wrapper = shallow(<Seekbar store={store} />);

describe('<Seekbar />', function() {
    it('Render Seekbar component', function() {
        state.playerState.sizes = {width: 600};
        state.media.isLive = false;
        state.media.time = 50;
        state.metaMedia.metas.length = 500;
        state.playerState.playedOnce = true;
        store = mockStore(state);
        wrapper = shallow(<Seekbar store={store} />);
        expect(wrapper.html()).toContain('<div class="seekbar-container">');
    });

    it('Do not render Seekbar if is live streaming', function() {
        state.playerState.sizes = {width: 600};
        state.media.isLive = true;
        state.media.time = 50;
        state.metaMedia.metas.length = 500;
        state.playerState.playedOnce = true;
        store = mockStore(state);
        wrapper = shallow(<Seekbar store={store} />);
        expect(wrapper.html()).toContain('');
    });

    it('Do not render Seekbar if width < 300', function() {
        state.playerState.sizes = {width: 250};
        state.media.isLive = false;
        state.media.time = 50;
        state.metaMedia.metas.length = 500;
        state.playerState.playedOnce = true;
        store = mockStore(state);
        wrapper = shallow(<Seekbar store={store} />);
        expect(wrapper.html()).toContain('');
    });

    it('Do not render Seekbar if media never played', function() {
        state.playerState.sizes = {width: 600};
        state.media.isLive = false;
        state.media.time = 50;
        state.metaMedia.metas.length = 500;
        state.playerState.playedOnce = false;
        store = mockStore(state);
        wrapper = shallow(<Seekbar store={store} />);
        expect(wrapper.html()).toContain('');
    });

    it('Do not render seek marks if nothing in ads or chapters', function() {
        state.playerState.sizes = {width: 600};
        state.media.isLive = false;
        state.media.time = 50;
        state.metaMedia.metas.length = 500;
        state.playerState.playedOnce = true;
        store = mockStore(state);
        wrapper = shallow(<Seekbar store={store} />);
        expect(wrapper.html()).not.toContain('<div class="seekbar-mark ');
    });

    it('Render seek marks if one chapter', function() {
        state.playerState.sizes = {width: 600};
        state.media.isLive = false;
        state.media.time = 50;
        state.metaMedia.metas.length = 500;
        state.metaMedia.metas.Chapitres = '00:00:20';
        state.playerState.playedOnce = true;
        store = mockStore(state);
        wrapper = shallow(<Seekbar store={store} />);
        expect(wrapper.html()).toContain('<div class="seekbar-mark ');
    });

    it('Render seek marks if many chapters', function() {
        state.playerState.sizes = {width: 600};
        state.media.isLive = false;
        state.media.time = 50;
        state.metaMedia.metas.length = 500;
        state.metaMedia.metas.Chapitres = '00:00:20,00:00:40,00:00:60';
        state.playerState.playedOnce = true;
        store = mockStore(state);
        wrapper = shallow(<Seekbar store={store} />);
        expect(wrapper.html()).toContain('<div class="seekbar-mark ');
    });
});