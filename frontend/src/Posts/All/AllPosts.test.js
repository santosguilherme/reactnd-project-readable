import React from 'react';
import {shallow} from 'enzyme';

import {AllPosts} from './AllPosts';
import PostList from '../components/PostList';

it('renders without crashing', () => {
    const wrapper = shallow(<AllPosts getAllPosts={jest.fn()}/>);

    expect(wrapper).toMatchSnapshot();
});

it('Should render PostList', () => {
    const wrapper = shallow(<AllPosts getAllPosts={jest.fn()}/>);

    expect(wrapper.find(PostList).length).toBeTruthy()
});

it('Should call getAllPosts on componentDidMount', () => {
    const getAllPostsMock = jest.fn();

    shallow(<AllPosts getAllPosts={getAllPostsMock}/>);

    expect(getAllPostsMock).toHaveBeenCalledTimes(1);
});