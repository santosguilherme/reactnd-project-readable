import React, {Component} from 'react';

import Confirm from './Confirm';


export default function withConfirm(WrappedComponent) {
    return class ConfirmWrapper extends Component {
        state = {
            open: false,
            message: '',
            confirmCallback: undefined
        };

        handleCancelConfirm = () => {
            this.setState({open: false, message: '', confirmCallback: undefined});
        };

        handleConfirm = () => {
            this.setState(state => {
                state.confirmCallback && state.confirmCallback();

                return {open: false, message: '', confirmCallback: undefined};
            });
        };

        handleOpenConfirm = (message, confirmCallback) => {
            this.setState({open: true, message, confirmCallback});
        };

        render() {
            const {open, message} = this.state;

            return [
                <WrappedComponent
                    key={0}
                    {...this.props}
                    confirm={this.handleOpenConfirm}
                />,
                <Confirm
                    key={1}
                    open={open}
                    message={message}
                    onCancel={this.handleCancelConfirm}
                    onConfirm={this.handleConfirm}
                />
            ];
        }
    };
}