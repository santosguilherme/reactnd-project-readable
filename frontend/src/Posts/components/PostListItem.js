import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {compose} from 'redux';
import {injectIntl, FormattedMessage} from 'react-intl';

import {FormattedDate} from 'react-intl';
import Truncate from 'react-truncate';

import Typography from 'material-ui/Typography';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';

import ThreeBoxDetails from '../../commons/components/ThreeBoxDetails/ThreeBoxDetails';
import SpinNumber from '../../commons/components/SpinNumber/SpinNumber';
import EditRemoveMenu from '../../commons/components/EditRemoveMenu/EditRemoveMenu';
import FlexColumnCenter from '../../commons/components/FlexColumnCenter/FlexColumnCenter';
import withConfirm from '../../commons/components/Confirm/withConfirm';

import PostPropType from '../PostPropType';

import './postListItem.css';


class PostListItem extends Component {
    handleVoteUpClick = () => {
        const {post, onVoteUp} = this.props;
        onVoteUp(post);
    };

    handleVoteDownClick = () => {
        const {post, onVoteDown} = this.props;
        onVoteDown(post);
    };

    handleEditPostClick = () => {
        const {post, onEditPost} = this.props;
        onEditPost(post);
    };

    handleRemovePostClick = () => {
        const {intl, confirm, post, onRemovePost} = this.props;

        confirm(intl.formatMessage({id: 'MESSAGES.REMOVE_POST_CONFIRM'}), () => {
            onRemovePost(post);
        });
    };

    handleOpenPost = () => {
        const {post, onOpenPost} = this.props;
        onOpenPost(post);
    };

    renderPostTimestamp() {
        const {post} = this.props;
        const postDate = new Date(post.timestamp);

        return (
            <FlexColumnCenter>
                <Typography
                    component="span"
                    align="center"
                >
                    <FormattedDate
                        value={postDate}
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
                        value={postDate}
                        month='short'
                    />
                </Typography>
            </FlexColumnCenter>
        );
    }

    renderPostVoteScore() {
        const {intl, post} = this.props;

        return (
            <SpinNumber
                value={post.voteScore}
                caption={intl.formatMessage({id: 'LABELS.POST_VOTE_SCORE_PLURAL'},
                    {count: post.voteScore}
                )}
                captionClassName="text-uppercase"
                onDown={this.handleVoteDownClick}
                onUp={this.handleVoteUpClick}
            />
        );
    }

    renderPostCommentCount() {
        const {post} = this.props;

        return (
            <FlexColumnCenter>
                <Typography
                    component="span"
                    align="center"
                >
                    {post.commentCount}
                </Typography>
                <Typography
                    component="span"
                    align="center"
                    type="caption"
                    className="text-uppercase"
                >
                    <FormattedMessage
                        id="LABELS.POST_COMMENTS"
                        values={{
                            count: post.commentCount
                        }}
                    />
                </Typography>
            </FlexColumnCenter>
        );
    }

    render() {
        const {post} = this.props;

        return (
            <Card className="post-list-item__card">
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
                        <EditRemoveMenu
                            entity={post}
                            onRemove={this.handleRemovePostClick}
                            onEdit={this.handleEditPostClick}
                        />
                    }
                />
                <CardContent classes={{root: 'post-list-item__card-content'}}>
                    <Typography
                        paragraph={true}
                        type="body1"
                    >
                        <Truncate lines={2}>
                            {post.body}
                        </Truncate>
                    </Typography>
                    <ThreeBoxDetails
                        left={this.renderPostTimestamp()}
                        center={this.renderPostVoteScore()}
                        right={this.renderPostCommentCount()}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        dense
                        color="primary"
                        onClick={this.handleOpenPost}
                    >
                        <FormattedMessage id="LABELS.VIEW_POST_DETAILS"/>
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

PostListItem.propTypes = {
    post: PostPropType.isRequired,
    onVoteDown: PropTypes.func.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    onOpenPost: PropTypes.func.isRequired,
    onRemovePost: PropTypes.func.isRequired,
    onEditPost: PropTypes.func.isRequired,
    /* confirm */
    confirm: PropTypes.func.isRequired,
    /* intl */
    intl: PropTypes.object.isRequired
};

export default compose(
    withConfirm,
    injectIntl
)(PostListItem);