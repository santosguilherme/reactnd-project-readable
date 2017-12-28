import React from 'react';

/**
 * https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl
 */
const Intl = require.requireActual('react-intl');

// Here goes intl context injected into component, feel free to extend
const intl = {
    formatMessage: ({defaultMessage}) => defaultMessage
};

Intl.injectIntl = (Node) => {
    const renderWrapped = props => <Node {...props} intl={intl}/>;
    renderWrapped.displayName = Node.displayName
        || Node.name
        || 'Component';
    return renderWrapped;
};

module.exports = Intl;