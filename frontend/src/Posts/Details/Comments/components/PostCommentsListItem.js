import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Card, {CardHeader, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

import PersonIcon from 'material-ui-icons/Person';

import FormattedDateTime from '../../../../commons/components/FormattedDateTime/FormattedDateTime';
import EditRemoveMenu from '../../../../commons/components/EditRemoveMenu/EditRemoveMenu';
import SpinNumber from '../../../../commons/components/SpinNumber/SpinNumber';

import './postCommentListItem.css';
import withConfirm from '../../../../commons/components/Confirm/withConfirm';


//FIXME: renomear
class PostCommentsListItem extends Component {
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
        const {confirm, comment, onRemoveComment} = this.props;

        confirm('Deseja remover o comentário?', () => {
            onRemoveComment(comment);
        });
    };

    render() {
        const {comment} = this.props;
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
                            caption="Scores"
                            onDown={this.handleVoteDownClick}
                            onUp={this.handleVoteUpClick}
                        />
                    </div>
                </CardContent>
            </Card>
        );
    }
}

PostCommentsListItem.defaultProps = {};

//TODO: comment propTypes
PostCommentsListItem.propTypes = {
    comment: PropTypes.object.isRequired,
    onEditComment: PropTypes.func.isRequired,
    onRemoveComment: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired,
    onVoteUp: PropTypes.func.isRequired,
    /* confirm */
    confirm: PropTypes.func.isRequired
};

export default withConfirm(PostCommentsListItem);