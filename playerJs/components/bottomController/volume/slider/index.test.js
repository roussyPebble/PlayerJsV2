import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import VolumeSlider from './index';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../../../store/initialState';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const store = mockStore(InitialState);
const wrapper = shallow(<VolumeSlider store={store} />);

describe('<VolumeSlider />', function() {
    it('Render VolumeSlider component', function() {
        expect(wrapper.html()).toContain('<input type="range" class="volume-slider');
    });
});