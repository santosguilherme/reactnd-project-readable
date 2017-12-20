import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';


function Confirm({title, open, message, onCancel, onConfirm, ...other}) {
    return (
        <Dialog
            ignoreBackdropClick
            ignoreEscapeKeyUp
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle>
                {title}
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
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

Confirm.defaultProps = {
    open: false,
    title: 'Confirm',
    message: ''
};

Confirm.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default Confirm;