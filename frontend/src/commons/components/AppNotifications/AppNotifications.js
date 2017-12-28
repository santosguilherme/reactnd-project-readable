import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import Notifications from 'react-notification-system-redux';


export function AppNotifications({notifications}) {
    const style = {
        NotificationItem: {
            DefaultStyle: {
                fontSize: '0.875rem',
                fontWeight: '400',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                lineHeight: '1.46429em'
            }
        }
    };

    return (
        <Notifications
            notifications={notifications}
            style={style}
        />
    );
}

AppNotifications.defaultProps = {
    notifications: []
};

AppNotifications.propTypes = {
    notifications: PropTypes.array
};

function mapStateToProps(state) {
    const {notifications} = state;
    return {notifications};
}

export default connect(mapStateToProps)(AppNotifications);
