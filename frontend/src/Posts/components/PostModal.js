import React from 'react';
import PropTypes from 'prop-types';

import ResponsiveDialog from '../../commons/components/ResponsiveDialog/ResponsiveDialog';
import PostForm from './PostForm';


class PostModal extends React.Component {
    handleSaveClick = post => {
        const {onSavePost} = this.props;
        onSavePost(post);
    };

    render() {
        const {
            open,
            title,
            onCancel
        } = this.props;
        return (
            <ResponsiveDialog
                open={open}
                title={title}
                className=""
                showActions={false}
            >
                <PostForm
                    onSubmit={this.handleSaveClick}
                    onCancel={onCancel}
                />
            </ResponsiveDialog>
        );
    }
}

PostModal.defaultProps = {
    post: {},
    title: 'Post',
    open: false
};

PostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    post: PropTypes.object,
    title: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSavePost: PropTypes.func.isRequired
};

export default PostModal;