import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import  PlayBtn from './index';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../../store/initialState';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const store = mockStore(InitialState);
const wrapper = shallow(<PlayBtn store={store} />);

describe('<PlayBtn />', function() {
    it('Render playbtn component', function() {
        expect(wrapper.html()).toContain('<button class="btn play-btn "');
    });
});