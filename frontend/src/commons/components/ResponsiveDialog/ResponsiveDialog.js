import React from 'react';
import PropTypes from 'prop-types';

import {compose} from 'redux';
import {injectIntl} from 'react-intl';

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
        intl,
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
            {showActions && (
                <DialogActions>
                    <Button
                        onClick={onCancel}
                        color="primary"
                    >
                        {cancelText || intl.formatMessage({id: 'LABELS.CANCEL'})}
                    </Button>
                    <Button
                        onClick={onOk}
                        color="primary"
                    >
                        {okText || intl.formatMessage({id: 'LABELS.OK'})}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}

ResponsiveDialog.defaultProps = {
    okText: '',
    cancelText: '',
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
    /* intl */
    intl: PropTypes.object.isRequired
};

export default compose(
    withMobileDialog(),
    injectIntl
)(ResponsiveDialog);