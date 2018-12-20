import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../store/initialState';

import LoadingCurtain from './index';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const store = mockStore(InitialState);
const wrapper = shallow(<LoadingCurtain store={store} />);

describe('<LoadingCurtain />', function() {
    it('Render LoadingCurtain component', function() {
        expect(wrapper.html()).toContain('<div class="loading-container"');
    });
});