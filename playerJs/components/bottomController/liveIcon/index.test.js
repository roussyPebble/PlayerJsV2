import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../../store/initialState';

import LiveIcon from './index';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const store = mockStore(InitialState);
const wrapper = shallow(<LiveIcon store={store} />);

describe('<LiveIcon />', function() {
    it('Render LiveIcon component', function() {
        expect(wrapper.html()).toContain('<div class="live-icon"');
    });
});