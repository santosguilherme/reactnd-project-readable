import React from 'react';
import PropTypes from 'prop-types';

import {injectIntl, FormattedMessage} from 'react-intl';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';


function Confirm({intl, title, open, message, onCancel, onConfirm, ...other}) {
    return (
        <Dialog
            ignoreBackdropClick
            ignoreEscapeKeyUp
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle>
                {title || intl.formatMessage({id: 'LABELS.CONFIRM_TITLE'})}
            </DialogTitle>
            <DialogContent>
                <Typography type="body2">
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onCancel}
                    color="primary"
                >
                    <FormattedMessage id="LABELS.CONFIRM_BUTTON_CANCEL"/>
                </Button>
                <Button
                    onClick={onConfirm}
                    color="primary"
                >
                    <FormattedMessage id="LABELS.CONFIRM_BUTTON_OK"/>
                </Button>
            </DialogActions>
        </Dialog>
    );
}

Confirm.defaultProps = {
    open: false,
    title: '',
    message: ''
};

Confirm.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    /* intl */
    intl: PropTypes.object.isRequired
};

export default injectIntl(Confirm);