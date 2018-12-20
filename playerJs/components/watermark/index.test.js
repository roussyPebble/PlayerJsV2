import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import  Watermark from './index';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../store/initialState';

configure({ adapter: new Adapter() });
const mockStore = configureStore();

describe('<Watermark />', function() {
    it('Render Watermark component passed by user param', function() {
        InitialState.userParams.integrationParams.watermark = 'https://rcavstaticplayer.akamaized.net/player2/ressources/svg/player-watermark_rc.svg';
        InitialState.playerState.playedOnce = true;
        InitialState.playerState.isLive = false;
        let store = mockStore(InitialState);
        let wrapper = shallow(<Watermark store={store} />);
        expect(wrapper.html()).toContain('<div class="watermark-container"');
    });

    it('Render Watermark component passed by meta media', function() {
        InitialState.userParams.integrationParams.watermark = 'https://rcavstaticplayer.akamaized.net/player2/ressources/svg/player-watermark_rc.svg';
        InitialState.playerState.playedOnce = true;
        InitialState.playerState.isLive = false;
        let store = mockStore(InitialState);
        let wrapper = shallow(<Watermark store={store} />);
        expect(wrapper.html()).toContain('<div class="watermark-container"');
    });

    it('Do not render Watermark component if not played once', function() {
        InitialState.userParams.integrationParams.watermark = 'https://rcavstaticplayer.akamaized.net/player2/ressources/svg/player-watermark_rc.svg';
        InitialState.playerState.playedOnce = false;
        InitialState.playerState.isLive = false;
        let store = mockStore(InitialState);
        let wrapper = shallow(<Watermark store={store} />);
        expect(wrapper.html()).toContain('');
    });

    it('Do not render Watermark component if live streaming', function() {
        InitialState.userParams.integrationParams.watermark = 'https://rcavstaticplayer.akamaized.net/player2/ressources/svg/player-watermark_rc.svg';
        InitialState.playerState.playedOnce = true;
        InitialState.playerState.isLive = true;
        let store = mockStore(InitialState);
        let wrapper = shallow(<Watermark store={store} />);
        expect(wrapper.html()).toContain('');
    });

    it('Do not render Watermark component if no watermark', function() {
        let store = mockStore(InitialState);
        let wrapper = shallow(<Watermark store={store} />);
        expect(wrapper.html()).toContain('');
    });
});