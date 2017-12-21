import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';

import FlexColumnCenter from '../FlexColumnCenter/FlexColumnCenter';


function SpinNumber(props) {
    const {value, caption, captionClassName, onUp, onDown} = props;

    return (
        <FlexColumnCenter>
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
                className={captionClassName}
            >
                {caption}
            </Typography>
            {onDown && (
                <IconButton onClick={onDown}>
                    <KeyboardArrowDown/>
                </IconButton>
            )}
        </FlexColumnCenter>
    );
}

SpinNumber.defaultProps = {
    caption: '',
    value: 0,
    captionClassName: ''
};

SpinNumber.propTypes = {
    captionClassName: PropTypes.string,
    caption: PropTypes.string,
    value: PropTypes.number.isRequired,
    onUp: PropTypes.func,
    onDown: PropTypes.func
};

export default SpinNumber;