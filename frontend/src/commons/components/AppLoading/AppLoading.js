import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {FormattedMessage} from 'react-intl';

import {CircularProgress} from 'material-ui/Progress';
import Typography from 'material-ui/Typography'

import {selectors as loadingSelectors} from '../../../redux/modules/loading';

import If from '../If/If';

import './appLoading.css';


export function AppLoading({show}) {
    return (
        <If test={show}>
            <div className="app-loading">
                <CircularProgress/>
                <Typography
                    type="body2"
                    align="center"
                    className="app-loading__message"
                >
                    <FormattedMessage id="MESSAGES.LOADING"/>
                </Typography>
            </div>
        </If>
    );
}

AppLoading.defaultProps = {
    show: false
};

AppLoading.propTypes = {
    show: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        show: loadingSelectors.getLoadingState(state)
    };
}

export default connect(mapStateToProps)(AppLoading);
