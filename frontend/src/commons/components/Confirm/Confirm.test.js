import React from 'react';
import {shallow} from 'enzyme';

import Confirm from './Confirm';


it('renders without crashing', () => {
    const wrapper = shallow(
        <Confirm
            onCancel={jest.fn()}
            onConfirm={jest.fn()}
        />
    );

    expect(wrapper).toMatchSnapshot();
});