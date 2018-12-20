import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../../store/initialState';

import BitrateBtn from './index';

configure({ adapter: new Adapter() });
const mockStore = configureStore();

InitialState.validationMedia.bitrates = [
    {
        bitrate: 0,
        lines: 'Auto',
        param: null,
    },
    {
        'bitrate':2500,
        'width':852,
        'height':480,
        'lines':'720p',
        'param':null
    },
    {
        'bitrate':1800,
        'width':852,
        'height':480,
        'lines':'540p',
        'param':null
    },
    {
        'bitrate':1100,
        'width':852,
        'height':480,
        'lines':'480p',
        'param':null
    },
    {
        'bitrate':700,
        'width':640,
        'height':360,
        'lines':'360p',
        'param':null
    },
    {
        'bitrate':400,
        'width':400,
        'height':224,
        'lines':'240p',
        'param':null
    },
    {
        'bitrate':256,
        'width':400,
        'height':224,
        'lines':'224p',
        'param':null
    }
];
const store = mockStore(InitialState);
const wrapper = shallow(<BitrateBtn store={store} />);

describe('<BitrateBtn />', function() {
    it('Render BitrateBtn component', function() {
        expect(wrapper.html()).toContain('<div class="bitrateContainer"');
    });

    it('BitrateBtn not rendering if above 480px', function() {
        let state = InitialState;
        state.playerState.sizes = {
            width: 320,
            height: 180
        };
        let store = mockStore(InitialState);
        let wrapper = shallow(<BitrateBtn store={store} />);
        expect(wrapper.html()).toBe('');
    });
});