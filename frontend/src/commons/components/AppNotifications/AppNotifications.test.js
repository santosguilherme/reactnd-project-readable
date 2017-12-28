import React from 'react';
import {shallow} from 'enzyme';

import {AppNotifications} from './AppNotifications';


it('renders without crashing', () => {
    const wrapper = shallow(<AppNotifications/>);

    expect(wrapper).toMatchSnapshot();
});