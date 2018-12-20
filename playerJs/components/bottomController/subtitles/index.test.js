import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../../store/initialState';

import SubtitleBtn from './index';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const store = mockStore(InitialState);
const wrapper = shallow(<SubtitleBtn store={store} />);

describe('<SubtitleBtn />', function() {
    it('Render SubtitleBtn component', function() {
        expect(wrapper.html()).toContain('<button class="btn subtitleBtn ');
    });
});