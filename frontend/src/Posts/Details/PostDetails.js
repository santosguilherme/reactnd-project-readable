import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';
import {FormattedMessage, FormattedDate, injectIntl} from 'react-intl';
import {withStyles} from 'material-ui/styles';


import {Grid, Row, Col} from 'react-flexbox-grid';

import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Person from 'material-ui-icons/Person';
import Today from 'material-ui-icons/Today';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import Typography from 'material-ui/Typography';

import AppBar from '../../App/AppBar';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {actions as postsActions, selectors as postsSelectors} from '../../redux/modules/posts';

import PostPropType from '../PostPropType';
import ThreeBoxDetails from '../../commons/components/ThreeBoxDetails/ThreeBoxDetails';

import './postDetails.css';

const styles = theme => ({
    threeChildrenItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

class PostDetails extends Component {
    componentDidMount() {
        const {match, getPostById, post} = this.props;

        if (post) {
            return;
        }

        getPostById(match.params.post);
    }

    handleBackClick = () => {
        this.props.history.push('/');
    };

    renderPostTimestamp(post) {
        const {classes} = this.props;

        return (
            <div className={classes.threeChildrenItem}>
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

    renderPostVoteScore(post) {
        const {classes} = this.props;

        return (
            <div className={classes.threeChildrenItem}>
                <IconButton className="">
                    <KeyboardArrowUp/>
                </IconButton>
                <Typography component="span" align="center">
                    {post.voteScore}
                </Typography>
                <Typography component="span" align="center" type="caption">
                    Votes
                </Typography>
                <IconButton className="">
                    <KeyboardArrowDown/>
                </IconButton>
            </div>
        );
    }

    renderPostAuthor() {
        const {classes, post} = this.props;
        const {author} = post;

        return (
            <div className={classes.threeChildrenItem}>
                <Person/>
                <Typography component="span" align="center" type="caption">
                    {author}
                </Typography>
            </div>
        );
    }

    renderPostDetails() {
        const {post} = this.props;

        return (
            <Row>
                <Col xs={12}>
                    <Typography
                        type="title"
                        component="h1"
                    >
                        {post.title}
                    </Typography>
                </Col>
                <Col xs={12}>
                    <ThreeBoxDetails
                        left={this.renderPostAuthor()}
                        center={this.renderPostVoteScore(post)}
                        right={this.renderPostTimestamp(post)}
                    />
                </Col>
                <Col xs={12}>
                    <Typography
                        type="body1"
                        paragraph={true}
                    >
                        {post.body}
                    </Typography>
                </Col>
                <Col xs={12}>
                    <Typography
                        type="subheading"
                        component="h2"
                    >
                        {post.commentCount} Comments
                    </Typography>
                </Col>
            </Row>
        );
    }

    render() {
        const {post} = this.props;

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
                        <IconButton color="contrast">
                            <MoreVertIcon/>
                        </IconButton>
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
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(PostDetails);