import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ResponsiveDialog from '../../../../commons/components/ResponsiveDialog/ResponsiveDialog';
import PostCommentForm from './PostCommentForm';


class PostCommentModal extends Component {
    handleSaveClick = comment => {
        const {onSaveComment} = this.props;
        onSaveComment(comment);
    };

    render() {
        const {
            open,
            comment,
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
                <PostCommentForm
                    comment={comment}
                    onSubmit={this.handleSaveClick}
                    onCancel={onCancel}
                />
            </ResponsiveDialog>
        );
    }
}

PostCommentModal.defaultProps = {
    comment: {},
    title: 'Comment',
    open: false
};

PostCommentModal.propTypes = {
    open: PropTypes.bool.isRequired,
    comment: PropTypes.object,
    title: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSaveComment: PropTypes.func.isRequired
};

export default PostCommentModal;