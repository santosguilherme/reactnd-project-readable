import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {injectIntl} from 'react-intl';

import List, {ListItem, ListItemText} from 'material-ui/List';
import Menu, {MenuItem} from 'material-ui/Menu';


const options = {
    timestamp: 'LABELS.POST_TIMESTAMP',
    voteScore: 'LABELS.POST_VOTE_SCORE',
    author: 'LABELS.POST_AUTHOR'
};

class OrderByFilter extends Component {
    state = {
        anchorEl: null,
        open: false,
        selectedIndex: 0,
    };

    handleClickListItem = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (event, index, value) => {
        const {onChange} = this.props;
        onChange(value);

        this.setState({selectedIndex: index, open: false});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {intl, selected} = this.props;

        return (
            <div>
                <List>
                    <ListItem
                        button
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            primary={intl.formatMessage({id: 'LABELS.ORDER_BY'})}
                            secondary={intl.formatMessage({id: options[selected]})}
                        />
                    </ListItem>
                </List>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    {Object.keys(options).map((optionKey, index) => (
                        <MenuItem
                            key={optionKey}
                            selected={optionKey === selected}
                            onClick={event => this.handleMenuItemClick(event, index, optionKey)}
                        >
                            {intl.formatMessage({id: options[optionKey]})}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

OrderByFilter.defaultProps = {
    selected: 'voteScore'
};

OrderByFilter.propTypes = {
    selected: PropTypes.oneOf(['voteScore', 'timestamp', 'author']),
    onChange: PropTypes.func.isRequired,
    /* intl */
    intl: PropTypes.object.isRequired
};

export default injectIntl(OrderByFilter);