import React from 'react';
import {shallow} from 'enzyme';

import AppBar from './AppBar';

it('renders without crashing', () => {
    const wrapper = shallow(<AppBar title="test"/>);

    expect(wrapper).toMatchSnapshot();
});

it('Should render left and right buttons', () => {
    const leftButton = <button>Left</button>;
    const rightButton = <button>Right</button>;
    const wrapper = shallow(
        <AppBar
            title="render buttons"
            leftButton={leftButton}
            rightButton={rightButton}
        />
    );

    expect(wrapper).toMatchSnapshot();
});