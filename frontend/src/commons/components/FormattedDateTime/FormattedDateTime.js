import React from 'react';
import PropTypes from 'prop-types';

import {injectIntl} from 'react-intl';


function FormattedDateTime({datetime, intl}) {
    const prefix = intl.formatMessage({id: 'LABELS.AT'});
    const date = intl.formatDate(datetime);
    const time = intl.formatTime(datetime);
    const value = `${prefix} ${date} ${time}`;

    return (
        <span>{value}</span>
    );
}

FormattedDateTime.propTypes = {
    datetime: PropTypes.number.isRequired
};

export default injectIntl(FormattedDateTime);