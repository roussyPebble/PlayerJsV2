import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import  Icon from './index';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('<Icon />', function() {
    it('Render Icon component', function() {
        let wrapper = shallow(<Icon />);
        expect(wrapper.html()).toContain('<svg');
    });
});