import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ResponsiveDialog from '../../commons/components/ResponsiveDialog/ResponsiveDialog';
import PostForm from './PostForm';


class PostModal extends Component {
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
//TODO: Post Proptypes
PostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    post: PropTypes.object,
    title: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSavePost: PropTypes.func.isRequired,
    categories: PropTypes.array
};

export default PostModal;