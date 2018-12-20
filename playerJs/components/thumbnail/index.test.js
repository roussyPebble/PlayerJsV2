import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Thumbnail from './index';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../store/initialState';
import extend from 'extend';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
let state = extend(InitialState, {});
let store = mockStore(state);
let wrapper = shallow(<Thumbnail store={store} />);

describe('<Thumbnail />', function() {
    it('Render Seekbar component', function() {
        store = mockStore(state);
        wrapper = shallow(<Thumbnail store={store} />);
        expect(wrapper.html()).toContain('<div class="thumbnail-background">');
    });
});