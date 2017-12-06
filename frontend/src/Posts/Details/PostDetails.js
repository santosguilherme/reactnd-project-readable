import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';
import {FormattedMessage, FormattedDate, injectIntl} from 'react-intl';


import {Grid, Row, Col} from 'react-flexbox-grid';

import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Person from 'material-ui-icons/Person';
import Today from 'material-ui-icons/Today';
import Typography from 'material-ui/Typography';

import AppBar from '../../App/AppBar';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {actions as postsActions, selectors as postsSelectors} from '../../redux/modules/posts';

import PostPropType from '../PostPropType';
import ThreeBoxDetails from '../../commons/components/ThreeBoxDetails/ThreeBoxDetails';

import './postDetails.css';
import SpinNumber from '../../commons/components/SpinNumber/SpinNumber';


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

    log = type => {
        return () => console.log(type);
    };

    renderPostVoteScore(post) {
        return (
            <SpinNumber
                value={post.voteScore}
                caption="Scores"
                onDown={this.log('down')}
                onUp={this.log('up')}
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
                        center={this.renderPostVoteScore(post)}
                        right={this.renderPostTimestamp(post)}
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
    connect(mapStateToProps, mapDispatchToProps)
)(PostDetails);