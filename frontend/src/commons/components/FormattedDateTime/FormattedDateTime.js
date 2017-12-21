import React from 'react';
import PropTypes from 'prop-types';

import {injectIntl} from 'react-intl';


const FormattedDateTime = ({datetime, intl}) => {
    const prefix = intl.formatMessage({id: 'LABELS.AT'});
    const date = intl.formatDate(datetime);
    const time = intl.formatTime(datetime);

    return `${prefix} ${date} ${time}`;
};

FormattedDateTime.propTypes = {
    datetime: PropTypes.number.isRequired
};

export default injectIntl(FormattedDateTime);