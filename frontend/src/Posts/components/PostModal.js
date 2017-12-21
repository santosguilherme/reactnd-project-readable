import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {injectIntl} from 'react-intl';

import ResponsiveDialog from '../../commons/components/ResponsiveDialog/ResponsiveDialog';
import PostForm from './PostForm';


class PostModal extends Component {
    handleSaveClick = post => {
        const {onSavePost} = this.props;
        onSavePost(post);
    };

    render() {
        const {
            intl,
            open,
            post,
            title,
            onCancel,
            categories
        } = this.props;

        return (
            <ResponsiveDialog
                open={open}
                title={title || intl.formatMessage({id: 'LABELS.POST'})}
                className=""
                showActions={false}
            >
                {Boolean(categories.length) && (
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
    title: '',
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
    categories: PropTypes.array,
    /* intl */
    intl: PropTypes.object.isRequired
};

export default injectIntl(PostModal);