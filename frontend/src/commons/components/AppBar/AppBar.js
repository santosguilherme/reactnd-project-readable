import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


const styles = () => ({
    appBar: {
        display: 'flex'
    },
    title: {
        flexGrow: 1
    },
    rightButtonContent: {
        width: '48px',
        marginRight: -12
    },
    rightButton: {},
    leftButtonContent: {
        width: '48px',
        marginLeft: -12
    },
    leftButton: {}
});

const AppBarWrapper = props => {
    const {
        classes,
        leftButton,
        rightButton,
        title
    } = props;


    return (
        <AppBar
            position="static"
            className={classes.appBar}
        >
            <Toolbar>
                <div className={classes.leftButtonContent}>
                    {leftButton && (leftButton)}
                </div>
                <Typography
                    type="title"
                    color="inherit"
                    className={`${classes.title} text-uppercase`}
                    align="center"
                >
                    {title}
                </Typography>
                <div className={classes.rightButtonContent}>
                    {rightButton && (rightButton)}
                </div>
            </Toolbar>
        </AppBar>
    );
};

AppBarWrapper.defaultProps = {
    title: ''
};

AppBarWrapper.propTypes = {
    leftButton: PropTypes.node,
    rightButton: PropTypes.node,
    title: PropTypes.string.isRequired
};

export default withStyles(styles)(AppBarWrapper);