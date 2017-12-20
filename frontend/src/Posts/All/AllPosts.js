import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {actions as postsActions} from '../../redux/modules/posts';

import PostList from '../components/PostList';


class AllPosts extends Component {
    componentDidMount() {
        const {getAllPosts} = this.props;
        getAllPosts();
    }

    render() {
        return <PostList/>;
    }
}

AllPosts.propTypes = {
    /* actions */
    getAllPosts: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    ...postsActions
};

export default connect(null, mapDispatchToProps)(AllPosts);