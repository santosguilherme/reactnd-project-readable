import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';

import {Grid, Row, Col} from 'react-flexbox-grid';

import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';

import AppBar from '../App/AppBar';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {actions as postsActions, selectors as postsSelectors} from '../redux/modules/posts';


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

    renderPostDetails() {
        const {post} = this.props;

        return (
            <div className="">
                {post.title}
            </div>
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
                            className=""
                            color="contrast"
                            onClick={this.handleBackClick}
                        >
                            <ArrowBack/>
                        </IconButton>
                    }
                />
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            {post && this.renderPostDetails()}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

PostDetails.propTypes = {
    post: PropTypes.object,
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
)(PostDetails);