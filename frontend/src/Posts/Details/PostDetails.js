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

import AppBar from '../../App/AppBar';
import {actions as postsActions, selectors as postsSelectors} from '../../redux/modules/posts';

import ThreeBoxDetails from '../../commons/components/ThreeBoxDetails/ThreeBoxDetails';
import SpinNumber from '../../commons/components/SpinNumber/SpinNumber';
import EditRemoveMenu from '../../commons/components/EditRemoveMenu/EditRemoveMenu';

import PostPropType from '../PostPropType';

import './postDetails.css';


class PostDetails extends Component {
    componentDidMount() {
        const {match, getPostById, post} = this.props;

        !post && getPostById(match.params.post);
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

    handleEditPostClick = post => {
        console.log('edit post', post);
    };

    handleRemovePostClick = post => {
        console.log('remove post', post);

    };

    renderPostTimestamp() {
        const {post} = this.props;

        return (
            <div className="flex-column-center">
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
            </div>
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
            <div className="flex-column-center">
                <Person/>
                <Typography component="span" align="center" type="caption">
                    {author}
                </Typography>
            </div>
        );
    }

    renderPostDetails() {
        const {post} = this.props;

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
                        {post.commentCount} Comments
                    </Typography>
                </Col>
            </Row>
        ];
    }

    render() {
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
            </div>
        );
    }
}

PostDetails.defaultProps = {
    post: undefined
};

PostDetails.propTypes = {
    post: PostPropType,
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
        post: postsSelectors.getPost(state, match.params.post)
    }
};

const mapDispatchToProps = {
    ...postsActions
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(PostDetails);