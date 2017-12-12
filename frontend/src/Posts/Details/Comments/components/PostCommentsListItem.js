import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Card, {CardHeader, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

import PersonIcon from 'material-ui-icons/Person';


class PostCommentsListItem extends Component {

    render() {
        const {comment} = this.props;
        const {author, timestamp, body} = comment;

        return (
            <Card>
                <CardHeader
                    avatar={
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                    }
                    title={author}
                    subheader={timestamp}
                />
                <CardContent>
                    <Typography>
                        {body}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}


PostCommentsListItem.defaultProps = {};

PostCommentsListItem.propTypes = {
    comment: PropTypes.object.isRequired
};

export default PostCommentsListItem