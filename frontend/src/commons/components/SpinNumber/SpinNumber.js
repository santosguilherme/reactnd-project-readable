import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';


function SpinNumber(props) {
    const {value, caption, onUp, onDown} = props;

    return (
        <div className="flex-column-center">
            {onUp && (
                <IconButton onClick={onUp}>
                    <KeyboardArrowUp/>
                </IconButton>
            )}
            <Typography
                component="span"
                align="center"
            >
                {value}
            </Typography>
            <Typography
                component="span"
                align="center"
                type="caption"
            >
                {caption}
            </Typography>
            {onDown && (
                <IconButton onClick={onDown}>
                    <KeyboardArrowDown/>
                </IconButton>
            )}
        </div>
    );
}

SpinNumber.defaultProps = {
    caption: '',
    value: 0
};


SpinNumber.propTypes = {
    caption: PropTypes.string,
    value: PropTypes.number.isRequired,
    onUp: PropTypes.func,
    onDown: PropTypes.func
};

export default SpinNumber;