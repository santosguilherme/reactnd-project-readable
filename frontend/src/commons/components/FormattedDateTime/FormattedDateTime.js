import React from 'react';
import PropTypes from 'prop-types';

import {injectIntl} from 'react-intl';


const FormattedDateTime = ({datetime, intl}) => (
    <span>At {intl.formatDate(datetime)} {intl.formatTime(datetime)}</span>
);

FormattedDateTime.propTypes = {
    datetime: PropTypes.number.isRequired
};

export default injectIntl(FormattedDateTime);