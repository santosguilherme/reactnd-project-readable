import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {compose} from 'redux';
import {injectIntl} from 'react-intl';

import Card, {CardHeader, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

import PersonIcon from 'material-ui-icons/Person';

import withConfirm from '../../../../commons/components/Confirm/withConfirm';
import FormattedDateTime from '../../../../commons/components/FormattedDateTime/FormattedDateTime';
import EditRemoveMenu from '../../../../commons/components/EditRemoveMenu/EditRemoveMenu';
import SpinNumber from '../../../../commons/components/SpinNumber/SpinNumber';

import './postCommentListItem.css';


class PostCommentListItem extends Component {
    handleVoteUpClick = () => {
        const {comment, onVoteUp} = this.props;
        onVoteUp(comment);
    };

    handleVoteDownClick = () => {
        const {comment, onVoteDown} = this.props;
        onVoteDown(comment);
    };

    handleEditCommentClick = () => {
        const {comment, onEditComment} = this.props;
        onEditComment(comment);
    };

    handleRemoveCommentClick = () => {
        const {intl, confirm, comment, onRemoveComment} = this.props;

        confirm(intl.formatMessage({id: 'MESSAGES.REMOVE_COMMENT_CONFIRM'}), () => {
            onRemoveComment(comment);
        });
    };

    render() {
        const {intl, comment} = this.props;
        const {author, timestamp, body} = comment;

        return (
            <Card className="post-comment-list-item__card">
                <CardHeader
                    avatar={
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                    }
                    title={author}
                    subheader={
                        <FormattedDateTime datetime={timestamp}/>
                    }
                    action={
                        <EditRemoveMenu
                            entity={comment}
                            onRemove={this.handleRemoveCommentClick}
                            onEdit={this.handleEditCommentClick}
                        />
                    }
                />
                <CardContent className="post-comment-list-item__card-content">
                    <Typography className="card-content__body">
                        {body}
                    </Typography>
                    <div>
                        <SpinNumber
                            value={comment.voteScore}
                            caption={intl.formatMessage({id: 'LABELS.COMMENT_VOTE_SCORE_PLURAL'},
                                {count: comment.voteScore}
                            )}
                            onDown={this.handleVoteDownClick}
                            onUp={this.handleVoteUpClick}
                        />
                    </div>
                </CardContent>
            </Card>
        );
    }
}

PostCommentListItem.defaultProps = {};

//TODO: comment propTypes
PostCommentListItem.propTypes = {
    comment: PropTypes.object.isRequired,
    onEditComment: PropTypes.func.isRequired,
    onRemoveComment: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    /* confirm */
    confirm: PropTypes.func.isRequired,
    /* intl */
    intl: PropTypes.object.isRequired
};

export default compose(
    withConfirm,
    injectIntl
)(PostCommentListItem);