import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {compose} from 'redux';
import PostPropType from '../../PostPropType';

import {actions as commentsActions, selectors as commentsSelectors} from '../../../redux/modules/comments';
import PostCommentsListItem from './components/PostCommentsListItem';


class PostCommentsList extends Component {
    componentDidMount() {
        const {match, post, getCommentsFromPost} = this.props;
        const postId = post && post.id
            ? post.id
            : match.params.post;

        postId && getCommentsFromPost(postId);
    }

    render() {
        const {comments} = this.props;

        return (
            <div>
                {comments.map(comment => (
                    <PostCommentsListItem
                        key={comment.id}
                        comment={comment}
                    />
                ))}
            </div>
        );
    }
}

PostCommentsList.defaultProps = {
    comments: []
};

PostCommentsList.propTypes = {
    post: PostPropType.isRequired,
    comments: PropTypes.array,
    /* actions */

    /* router */
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        comments: commentsSelectors.getComments(state)
    }
};

const mapDispatchToProps = {
    ...commentsActions
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(PostCommentsList);
