import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {actions as postsActions} from '../../redux/modules/posts';
import {actions as filterActions, selectors as filterSelectors} from '../../redux/modules/postsFilter';

import PostList from '../components/PostList';


class CategoryPosts extends Component {
    componentDidMount() {
        const {getCategoryPosts, updatePostsFilter, match, history, category} = this.props;
        const categoryParam = match.params.category;

        if (!category || category !== categoryParam) {
            updatePostsFilter({category: categoryParam});
        }

        getCategoryPosts(categoryParam);

        this.unlisten = history.listen(location => {
            const {category} = location.state;

            category && getCategoryPosts(category);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return <PostList/>;
    }
}

CategoryPosts.propTypes = {
    category: PropTypes.string,
    /* actions */
    getCategoryPosts: PropTypes.func.isRequired,
    updatePostsFilter: PropTypes.func.isRequired,
    /* router */
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    category: filterSelectors.getSelectedCategory(state)
});

const mapDispatchToProps = {
    ...postsActions,
    ...filterActions
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(CategoryPosts);