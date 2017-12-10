import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {compose} from 'redux';
import {connect} from 'react-redux';

import ResponsiveDialog from '../../commons/components/ResponsiveDialog/ResponsiveDialog';
import PostForm from './PostForm';

import {actions as categoriesActions, selectors as categoriesSelectors} from '../../redux/modules/categories';


class PostModal extends Component {
    componentDidMount() {
        const {getAllCategories} = this.props;
        getAllCategories();
    }

    handleSaveClick = post => {
        const {onSavePost} = this.props;
        onSavePost(post);
    };

    render() {
        const {
            open,
            post,
            title,
            onCancel,
            categories
        } = this.props;

        return (
            <ResponsiveDialog
                open={open}
                title={title}
                className=""
                showActions={false}
            >
                {categories.length && (
                    <PostForm
                        post={post}
                        onSubmit={this.handleSaveClick}
                        onCancel={onCancel}
                        categories={categories}
                    />
                )}
            </ResponsiveDialog>
        );
    }
}

PostModal.defaultProps = {
    post: {},
    title: 'Post',
    open: false,
    categories: []
};

PostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    post: PropTypes.object,
    title: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSavePost: PropTypes.func.isRequired,
    /* redux */
    categories: PropTypes.array
};

function mapStateToProps(state) {
    return {
        categories: categoriesSelectors.getCategories(state)
    }
}

const mapDispatchToProps = {
    getAllCategories: categoriesActions.getAllCategories
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(PostModal);