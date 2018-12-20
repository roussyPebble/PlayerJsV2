import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import BigPlayBtn from './index';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../store/initialState';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const store = mockStore(InitialState);
const wrapper = shallow(<BigPlayBtn store={store} />);

describe('<BigPlayBtn />', function() {
    it('Render BigPlayBtn component', function() {
        expect(wrapper.html()).toContain('<button class="big-play-btn show"');
    });
});