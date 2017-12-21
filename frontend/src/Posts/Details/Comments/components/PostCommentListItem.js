import React from 'react';
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


function PostCommentListItem(props) {
    const handleVoteUpClick = () => {
        const {comment, onVoteUp} = props;
        onVoteUp(comment);
    };

    const handleVoteDownClick = () => {
        const {comment, onVoteDown} = props;
        onVoteDown(comment);
    };

    const handleEditCommentClick = () => {
        const {comment, onEditComment} = props;
        onEditComment(comment);
    };

    const handleRemoveCommentClick = () => {
        const {intl, confirm, comment, onRemoveComment} = props;

        confirm(intl.formatMessage({id: 'MESSAGES.REMOVE_COMMENT_CONFIRM'}), () => {
            onRemoveComment(comment);
        });
    };

    const {intl, comment} = props;
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
                        onRemove={handleRemoveCommentClick}
                        onEdit={handleEditCommentClick}
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
                        onDown={handleVoteDownClick}
                        onUp={handleVoteUpClick}
                    />
                </div>
            </CardContent>
        </Card>
    );
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