import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import  Info from './index';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import InitialState from '../../store/initialState';

configure({ adapter: new Adapter() });
const mockStore = configureStore();

describe('<Info />', function() {
    it('Render Info component', function() {
        InitialState.metaMedia.metas = {Title: 'test title'};
        let store = mockStore(InitialState);
        let wrapper = shallow(<Info store={store} />);
        expect(wrapper.html()).toContain('<button class="btn info-btn');
    });

    it('Do not render Info component if not title', function() {
        InitialState.metaMedia.metas = {Title: ''};
        let store = mockStore(InitialState);
        let wrapper = shallow(<Info store={store} />);
        expect(wrapper.html()).toContain('');
    });
});