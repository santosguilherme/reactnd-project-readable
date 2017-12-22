import React from 'react';
import {shallow} from 'enzyme';

import If from './If';

it('renders without crashing', () => {
    const wrapper = shallow(<If/>);

    expect(wrapper).toMatchSnapshot();
});

it('Should render children when test property is true', () => {
    const wrapper = shallow(
        <If test={true}>
            <span>Test</span>
        </If>
    );

    expect(wrapper).toMatchSnapshot();
});