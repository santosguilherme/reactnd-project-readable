import React from 'react';
import PropTypes from 'prop-types';

import './threeBoxDetails.css';


function ThreeBoxDetails(props) {
    const {left, center, right} = props;

    return (
        <div className="three-box-details__container">
            <div
                className="three-box-details__box"
            >
                {left}
            </div>
            <div className="three-box-details__box">
                {center}
            </div>
            <div
                className="three-box-details__box"
            >
                {right}
            </div>
        </div>
    );
}

ThreeBoxDetails.propTypes = {
    left: PropTypes.node.isRequired,
    center: PropTypes.node.isRequired,
    right: PropTypes.node.isRequired
};

export default ThreeBoxDetails;