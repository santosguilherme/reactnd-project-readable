import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import './appBar.css';


function AppBarWrapper(props) {
    const {leftButton, rightButton, title} = props;

    return (
        <AppBar
            position="static"
            className="app-bar"
        >
            <Toolbar>
                <div className="app-bar__right-content">
                    {leftButton && (leftButton)}
                </div>
                <Typography
                    type="title"
                    color="inherit"
                    className="app-bar__title"
                    align="center"
                >
                    {title}
                </Typography>
                <div className="app-bar__left-content">
                    {rightButton && (rightButton)}
                </div>
            </Toolbar>
        </AppBar>
    );
}

AppBarWrapper.defaultProps = {
    title: ''
};

AppBarWrapper.propTypes = {
    leftButton: PropTypes.node,
    rightButton: PropTypes.node,
    title: PropTypes.string.isRequired
};

export default AppBarWrapper;