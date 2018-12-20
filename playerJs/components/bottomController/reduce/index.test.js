import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import ReduceBtn from './index';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../../store/initialState';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const store = mockStore(InitialState);
const wrapper = shallow(<ReduceBtn store={store} />);

describe('<ReduceBtn />', function() {
    it('Render ReduceBtn component', function() {
        expect(wrapper.html()).toContain('<button class="btn reduce-btn "');
    });
});