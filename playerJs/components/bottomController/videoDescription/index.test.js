import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../../store/initialState';

import VideoDescriptionBtn from './index';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const store = mockStore(InitialState);
const wrapper = shallow(<VideoDescriptionBtn store={store} />);

describe('<VideoDescriptionBtn />', function() {
    it('Render VideoDescriptionBtn component', function() {
        expect(wrapper.html()).toContain('<button class="btn video-description-btn ');
    });
});