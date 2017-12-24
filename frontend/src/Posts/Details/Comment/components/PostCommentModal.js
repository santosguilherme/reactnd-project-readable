import React from 'react';
import PropTypes from 'prop-types';

import {injectIntl} from 'react-intl';

import ResponsiveDialog from '../../../../commons/components/ResponsiveDialog/ResponsiveDialog';

import PostCommentForm from './PostCommentForm';
import CommentPropType from '../CommentPropType';


function PostCommentModal(props) {
    const handleSaveClick = comment => {
        const {onSaveComment} = props;
        onSaveComment(comment);
    };

    const {
        intl,
        open,
        comment,
        title,
        onCancel
    } = props;

    return (
        <ResponsiveDialog
            open={open}
            title={title || intl.formatMessage({id: 'LABELS.COMMENT'})}
            showActions={false}
        >
            <PostCommentForm
                comment={comment}
                onSubmit={handleSaveClick}
                onCancel={onCancel}
            />
        </ResponsiveDialog>
    );
}

PostCommentModal.defaultProps = {
    comment: {},
    title: '',
    open: false
};

PostCommentModal.propTypes = {
    open: PropTypes.bool.isRequired,
    comment: CommentPropType,
    title: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSaveComment: PropTypes.func.isRequired,
    /* intl */
    intl: PropTypes.object.isRequired
};

export default injectIntl(PostCommentModal);