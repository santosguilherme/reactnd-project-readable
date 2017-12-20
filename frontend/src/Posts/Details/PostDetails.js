import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';
import {FormattedDate} from 'react-intl';


import {Grid, Row, Col} from 'react-flexbox-grid';

import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Person from 'material-ui-icons/Person';
import Today from 'material-ui-icons/Today';
import Typography from 'material-ui/Typography';

import {compose} from 'redux';
import {connect} from 'react-redux';

import AppBar from '../../commons/components/AppBar/AppBar';
import {actions as postsActions, selectors as postsSelectors} from '../../redux/modules/posts';

import ThreeBoxDetails from '../../commons/components/ThreeBoxDetails/ThreeBoxDetails';
import SpinNumber from '../../commons/components/SpinNumber/SpinNumber';
import EditRemoveMenu from '../../commons/components/EditRemoveMenu/EditRemoveMenu';

import PostPropType from '../PostPropType';

import './postDetails.css';
import PostModal from '../components/PostModal';
import PostCommentsList from './Comments/PostCommentsList';
import {actions as commentsActions, selectors as commentsSelectors} from '../../redux/modules/comments';
import FlexColumnCenter from '../../commons/components/FlexColumnCenter/FlexColumnCenter';


class PostDetails extends Component {
    state = {
        editModalOpen: false
    };

    componentDidMount() {
        const {match, getPostById, post, getCommentsFromPost} = this.props;
        const postLoaded = post && post.id;
        const postId = post && post.id
            ? post.id
            : match.params.post;

        !postLoaded && getPostById(postId);
        postId && getCommentsFromPost(postId);
    }

    handleBackClick = () => {
        this.props.history.push('/');
    };

    handleVoteUpClick = () => {
        const {voteUp, post} = this.props;

        voteUp(post);
    };

    handleVoteDownClick = () => {
        const {voteDown, post} = this.props;

        voteDown(post);
    };

    handleSavePostModal = post => {
        const {updatePost} = this.props;

        updatePost(post);
        this.setState({editModalOpen: false});
    };

    handleEditPostClick = () => {
        this.setState({editModalOpen: true});
    };

    handleCancelPostModal = () => {
        this.setState({editModalOpen: false});
    };

    handleRemovePostClick = () => {
        const {match, history, location, post, deletePost} = this.props;
        const {category} = match.params;
        const {state} = location;
        const backUrl = state && state.from
            ? state.from
            : `/${category}`;

        deletePost(post);
        history.push(backUrl);
    };

    renderPostTimestamp() {
        const {post} = this.props;

        return (
            <FlexColumnCenter>
                <Today/>
                <Typography
                    component="span"
                    align="center"
                    type="caption"
                >
                    <FormattedDate
                        value={new Date(post.timestamp)}
                        day="2-digit"
                        month="2-digit"
                        year="numeric"
                    />
                </Typography>
            </FlexColumnCenter>
        );
    }

    renderPostVoteScore() {
        const {post} = this.props;

        return (
            <SpinNumber
                value={post.voteScore}
                caption="Scores"
                onDown={this.handleVoteDownClick}
                onUp={this.handleVoteUpClick}
            />
        );
    }

    renderPostAuthor() {
        const {post} = this.props;
        const {author} = post;

        return (
            <FlexColumnCenter>
                <Person/>
                <Typography component="span" align="center" type="caption">
                    {author}
                </Typography>
            </FlexColumnCenter>
        );
    }

    renderPostDetails() {
        const {post, comments} = this.props;

        const colProps = {
            xs: 12,
            sm: 12,
            md: 8,
            lg: 6,
            mdOffset: 2,
            lgOffset: 3
        };

        return [
            <Row key={1}>
                <Col {...colProps}>
                    <Typography
                        type="title"
                        component="h1"
                    >
                        {post.title}
                    </Typography>
                </Col>
            </Row>,
            <Row key={2}>
                <Col {...colProps}>
                    <ThreeBoxDetails
                        left={this.renderPostAuthor()}
                        center={this.renderPostVoteScore()}
                        right={this.renderPostTimestamp()}
                    />
                </Col>
            </Row>,
            <Row key={3}>
                <Col {...colProps}>
                    <Typography
                        type="body1"
                        paragraph={true}
                    >
                        {post.body}
                    </Typography>
                </Col>
            </Row>,
            <Row key={4}>
                <Col {...colProps}>
                    <Typography
                        type="subheading"
                        component="h2"
                    >
                        {comments.length || post.commentCount} Comments
                    </Typography>
                </Col>
            </Row>,
            <Row key={5}>
                <Col {...colProps}>
                    <PostCommentsList
                        post={post}
                        comments={comments}
                    />
                </Col>
            </Row>
        ];
    }

    render() {
        const {editModalOpen} = this.state;
        const {post} = this.props;

        if (!post) {
            return null;
        }

        return (
            <div>
                <AppBar
                    title="post"
                    leftButton={
                        <IconButton
                            color="contrast"
                            onClick={this.handleBackClick}
                        >
                            <ArrowBack/>
                        </IconButton>
                    }
                    rightButton={
                        <EditRemoveMenu
                            entity={post}
                            onEdit={this.handleEditPostClick}
                            onRemove={this.handleRemovePostClick}
                            buttonProps={{color: 'contrast'}}
                        />
                    }
                />
                <Grid
                    fluid
                    className="post-details__container"
                >
                    {post && this.renderPostDetails()}
                </Grid>
                <PostModal
                    open={editModalOpen}
                    post={post}
                    onCancel={this.handleCancelPostModal}
                    onSavePost={this.handleSavePostModal}
                />
            </div>
        );
    }
}

PostDetails.defaultProps = {
    post: undefined,
    comments: []
};

PostDetails.propTypes = {
    post: PostPropType,
    comments: PropTypes.array,
    /* actions */
    getPostById: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    /* router */
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const {match} = ownProps;

    return {
        post: postsSelectors.getPost(state, match.params.post),
        comments: commentsSelectors.getComments(state)
    }
};

const mapDispatchToProps = {
    ...postsActions,
    getCommentsFromPost: commentsActions.getCommentsFromPost
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(PostDetails);