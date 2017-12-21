import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';

import MoreVertIcon from 'material-ui-icons/MoreVert';


class EditRemoveMenu extends Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({anchorEl: null});
    };

    handleEditClick = () => {
        const {entity, onEdit} = this.props;

        onEdit && onEdit(entity);
        this.handleRequestClose();
    };

    handleRemoveClick = () => {
        const {entity, onRemove} = this.props;

        onRemove && onRemove(entity);
        this.handleRequestClose();
    };

    render() {
        const {buttonProps} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    onClick={this.handleClick}
                    {...buttonProps}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onRequestClose={this.handleRequestClose}
                >
                    <MenuItem onClick={this.handleEditClick}>
                        <FormattedMessage id="LABELS.MENU_OPTION_EDIT"/>
                    </MenuItem>
                    <MenuItem onClick={this.handleRemoveClick}>
                        <FormattedMessage id="LABELS.MENU_OPTION_DELETE"/>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

EditRemoveMenu.defaultProps = {
    buttonProps: {}
};

EditRemoveMenu.propTypes = {
    entity: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    buttonProps: PropTypes.object
};

export default EditRemoveMenu;