import React, {Component} from 'react';
import PropTypes from 'prop-types';

import List, {ListItem, ListItemText} from 'material-ui/List';
import Menu, {MenuItem} from 'material-ui/Menu';

const options = {
    timestamp: 'LABELS.TIMESTAMP',
    voteScore: 'LABELS.VOTE_SCORE',
    author: 'LABELS.AUTHOR'
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
        const {selected} = this.props;

        return (
            <div>
                <List>
                    <ListItem
                        button
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            primary="Ordenação"
                            secondary={options[selected]}
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
                            {options[optionKey]}
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
    onChange: PropTypes.func.isRequired
};

export default OrderByFilter;