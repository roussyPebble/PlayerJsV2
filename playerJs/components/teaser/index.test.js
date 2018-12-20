import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../store/initialState';

import Teaser from './index';

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const store = mockStore(InitialState);
const wrapper = shallow(<Teaser store={store} />);

describe('<Teaser />', function() {
    it('Render Teaser component', function() {
        expect(wrapper.html()).toContain('<img class="rcplayer-teaser show"');
    });
});