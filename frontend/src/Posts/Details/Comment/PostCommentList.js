import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {compose} from 'redux';

import {FormattedMessage} from 'react-intl';

import Button from 'material-ui/Button';

import {actions as commentsActions} from '../../../redux/modules/comments';

import PostCommentListItem from './components/PostCommentListItem';
import PostCommentModal from './components/PostCommentModal';
import PostPropType from '../../PostPropType';
import CommentPropType from './CommentPropType';

import './postCommentList.css';


class PostCommentsList extends Component {
    state = {
        selectedComment: undefined,
        commentModalOpen: false
    };

    handleSaveNewComment(comment) {
        const {saveNewComment, post} = this.props;

        this.setState({commentModalOpen: false});
        saveNewComment({...comment, parentId: post.id});
    }

    handleUpdateComment(comment) {
        const {updateComment} = this.props;

        this.setState({commentModalOpen: false, selectedComment: undefined});
        updateComment({...comment, timestamp: Date.now()});
    }

    handleSaveCommentModal = comment => {
        const {selectedComment} = this.state;

        selectedComment
            ? this.handleUpdateComment(comment)
            : this.handleSaveNewComment(comment);
    };

    handleNewComment = () => {
        this.setState({commentModalOpen: true});
    };

    handleCancelCommentModal = () => {
        this.setState({commentModalOpen: false});
    };

    handleVoteUp = comment => {
        const {voteUp} = this.props;
        voteUp(comment);
    };

    handleVoteDown = comment => {
        const {voteDown} = this.props;
        voteDown(comment);
    };

    handleEditComment = comment => {
        this.setState({commentModalOpen: true, selectedComment: comment});
    };

    handleRemoveComment = comment => {
        const {deleteComment} = this.props;
        deleteComment(comment);
    };

    render() {
        const {commentModalOpen, selectedComment} = this.state;
        const {comments} = this.props;

        return (
            <div className="post-comment-list">
                {comments.map(comment => (
                    <PostCommentListItem
                        key={comment.id}
                        comment={comment}
                        onVoteUp={this.handleVoteUp}
                        onVoteDown={this.handleVoteDown}
                        onEditComment={this.handleEditComment}
                        onRemoveComment={this.handleRemoveComment}
                    />
                ))}
                <div className="post-comment-list__new-comment-container">
                    <Button
                        raised
                        color="primary"
                        onClick={this.handleNewComment}
                    >
                        <FormattedMessage id="LABELS.NEW_COMMENT"/>
                    </Button>
                </div>
                <PostCommentModal
                    open={commentModalOpen}
                    comment={selectedComment}
                    onCancel={this.handleCancelCommentModal}
                    onSaveComment={this.handleSaveCommentModal}
                />
            </div>
        );
    }
}

PostCommentsList.defaultProps = {
    comments: []
};

PostCommentsList.propTypes = {
    post: PostPropType,
    comments: PropTypes.arrayOf(CommentPropType),
    /* actions */
    saveNewComment: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    /* router */
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
    ...commentsActions
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(PostCommentsList);
