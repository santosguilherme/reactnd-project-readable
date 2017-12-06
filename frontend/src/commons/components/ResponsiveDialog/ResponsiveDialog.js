import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';

function ResponsiveDialog(props) {
    const {
        fullScreen,
        open,
        title,
        okText,
        cancelText,
        onCancel,
        onOk,
        showActions,
        children
    } = props;

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onRequestClose={onCancel}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            {showActions && (<
                    DialogActions>
                    <Button
                        onClick={onCancel}
                        color="primary"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        onClick={onOk}
                        color="primary"
                    >
                        {okText}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}

ResponsiveDialog.defaultProps = {
    okText: 'Ok',
    cancelText: 'Cancel',
    title: '',
    open: false,
    showActions: true
};

ResponsiveDialog.propTypes = {
    showActions: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    /* withMobileDialog */
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);