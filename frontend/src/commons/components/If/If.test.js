import React from 'react';
import {shallow} from 'enzyme';

import If from './If';

it('renders without crashing', () => {
    const wrapper = shallow(<If><h1>test</h1></If>);

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

it('Shouldnt we render children when test property is false', () => {
    const wrapper = shallow(
        <If test={false}>
            <span>Test</span>
        </If>
    );

    expect(wrapper).toMatchSnapshot();
});