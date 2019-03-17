import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigrationItems from './index';
import NavigationItem from './NavigationItem';

configure({ adapter: new Adapter() })

// Ovde moze da bude bilo kakav string, to je samo naziv testa ne mora da stoji naziv komponente
describe('<NavigationItems />', () => {

    let wrapper;

    beforeEach (() => {
        wrapper = shallow(<NavigrationItems />);
    })

    // unit test name (function)
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {

        wrapper.setProps({
            isAuthenticated: true,
        })

        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () => {

        wrapper.setProps({
            isAuthenticated: true,
        })

        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true); 
    });
}); 