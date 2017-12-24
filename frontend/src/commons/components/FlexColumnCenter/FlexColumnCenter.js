import React from 'react';
import PropTypes from 'prop-types';

import './flexColumnCenter.css';


function FlexColumnCenter({children}) {
    return (
        <div className="flex-column-center">
            {children}
        </div>
    );
}

FlexColumnCenter.propTypes = {
    children: PropTypes.node.isRequired
};

export default FlexColumnCenter;