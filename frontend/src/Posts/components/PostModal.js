import React from 'react';
import PropTypes from 'prop-types';

import {injectIntl} from 'react-intl';

import ResponsiveDialog from '../../commons/components/ResponsiveDialog/ResponsiveDialog';

import PostForm from './PostForm';
import PostPropType from '../PostPropType';


function PostModal(props) {
    const handleSaveClick = post => {
        const {onSavePost} = props;
        onSavePost(post);
    };

    const {
        intl,
        open,
        post,
        title,
        onCancel,
        categories
    } = props;

    return (
        <ResponsiveDialog
            open={open}
            title={title || intl.formatMessage({id: 'LABELS.POST'})}
            showActions={false}
        >
            {Boolean(categories.length) && (
                <PostForm
                    post={post}
                    onSubmit={handleSaveClick}
                    onCancel={onCancel}
                    categories={categories}
                />
            )}
        </ResponsiveDialog>
    );
}

PostModal.defaultProps = {
    post: {},
    title: '',
    open: false,
    categories: []
};

PostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    post: PostPropType,
    title: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSavePost: PropTypes.func.isRequired,
    categories: PropTypes.array,
    /* intl */
    intl: PropTypes.object.isRequired
};

export default injectIntl(PostModal);