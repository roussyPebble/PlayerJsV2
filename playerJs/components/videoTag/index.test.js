import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../store/initialState';

import VideoTag from './index';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const store = mockStore(InitialState);
const wrapper = shallow(<VideoTag store={store} />);

describe('<VideoTag />', function() {
    it('Render VideoTag component', function() {
        expect(wrapper.html()).toContain('<video class="video-tag"');
    });
});