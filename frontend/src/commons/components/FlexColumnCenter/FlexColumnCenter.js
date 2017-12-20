import React from 'react';

import './flexColumnCenter.css';


function FlexColumnCenter({children}) {
    return (
        <div className="flex-column-center">
            {children}
        </div>
    );
}

export default FlexColumnCenter;