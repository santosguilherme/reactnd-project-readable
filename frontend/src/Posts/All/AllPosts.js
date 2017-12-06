import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {FormattedMessage, FormattedDate, injectIntl} from 'react-intl';
import {withStyles} from 'material-ui/styles';

import {Grid, Row, Col} from 'react-flexbox-grid';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';


import Truncate from 'react-truncate';

import {actions as postsActions, selectors as postsSelectors} from '../../redux/modules/posts';

import AppBar from '../../App/AppBar'
import PostPropType from '../PostPropType';
import ThreeBoxDetails from '../../commons/components/ThreeBoxDetails/ThreeBoxDetails';
import SpinNumber from '../../commons/components/SpinNumber/SpinNumber';

import './allPosts.css';
import PostModal from '../components/PostModal';

const styles = theme => ({
    addButton: {
        position: 'fixed',
        bottom: '10px',
        right: '10px'
    },
    filterContent: {
        textAlign: 'center',
        padding: '15px 0 10px'
    },
    filterButton: {
        width: '100%'
    },
    card: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        //maxWidth: 400
    },
    cardContent: {
        paddingTop: '0',
        paddingBottom: '0'
    }
});

class AllPosts extends Component {
    state = {
        postModalOpen: false
    };

    componentDidMount() {
        const {getAllPosts} = this.props;
        getAllPosts();
    }

    handleOpenPost = post => {
        const {history} = this.props;
        const {id, category} = post;

        history.push(`${category}/posts/${id}`);
    };

    handleSavePostModal = (post) => {
        this.setState({postModalOpen: false});

        console.log('saving post...', post);
    };

    handleCancelPostModal = () => {
        this.setState({postModalOpen: false});
    };

    handleNewPost = () => {
        this.setState({postModalOpen: true});
    };

    renderPostTimestamp(post) {
        return (
            <div className="flex-column-center">
                <Typography component="span" align="center">
                    <FormattedDate
                        value={new Date(post.timestamp)}
                        day='2-digit'
                    />
                </Typography>
                <Typography
                    component="span"
                    align="center"
                    type="caption"
                    className="text-uppercase"
                >
                    <FormattedDate
                        value={new Date(post.timestamp)}
                        month='short'
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
                caption="SCORES"
                onDown={this.log('down')}
                onUp={this.log('up')}
            />
        );

    }

    renderPostommentCount(post) {
        return (
            <div className="flex-column-center">
                <Typography component="span" align="center">
                    {post.commentCount}
                </Typography>
                <Typography component="span" align="center" type="caption">
                    COMMENTS
                </Typography>
            </div>
        );
    }

    render() {
        const {classes, posts} = this.props;

        const colProps = {
            xs: 12,
            sm: 8,
            md: 6,
            lg: 4
        };

        return (
            <div>
                <AppBar title="All posts"/>
                <Grid fluid>
                    <Row center="xs">
                        <Col {...colProps}>
                            <div className={classes.filterContent}>
                                <Button
                                    raised
                                    color="primary"
                                    className={classes.filterButton}
                                >
                                    Filter and Sort
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {posts.map(post => (
                        <Row center="xs" key={post.id}>
                            <Col

                                {...colProps}
                            >
                                <Card className={classes.card}>
                                    <CardHeader
                                        title={
                                            <Typography type="title">
                                                {post.title}
                                            </Typography>
                                        }
                                        subheader={
                                            <Typography type="subheading">
                                                {post.author}
                                            </Typography>
                                        }
                                        action={
                                            <IconButton>
                                                <MoreVertIcon/>
                                            </IconButton>
                                        }
                                    />
                                    <CardContent classes={{root: classes.cardContent}}>
                                        <Typography
                                            paragraph={true}
                                            type="body1"
                                        >
                                            <Truncate lines={2}>
                                                {post.body}
                                            </Truncate>
                                        </Typography>
                                        <ThreeBoxDetails
                                            left={this.renderPostTimestamp(post)}
                                            center={this.renderPostVoteScore(post)}
                                            right={this.renderPostommentCount(post)}
                                        />
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            dense
                                            color="primary"
                                            onClick={() => this.handleOpenPost(post)}
                                        >
                                            View post
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Col>
                        </Row>
                    ))}

                </Grid>
                <Button
                    fab
                    color="primary"
                    className={classes.addButton}
                    onClick={this.handleNewPost}
                >
                    <AddIcon/>
                </Button>
                <PostModal
                    open={this.state.postModalOpen}
                    onCancel={this.handleCancelPostModal}
                    onSavePost={this.handleSavePostModal}
                />
            </div>
        );
    }
}

AllPosts.defaultProps = {
    posts: [],
    categories: []
};

AllPosts.propTypes = {
    /* actions */
    getAllPosts: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PostPropType),
    /* router */
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    posts: postsSelectors.getPosts(state)
});

const mapDispatchToProps = {
    ...postsActions
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(AllPosts);