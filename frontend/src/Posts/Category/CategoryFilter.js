import React, {Component} from 'react';
import PropTypes from 'prop-types';

import List, {ListItem, ListItemText} from 'material-ui/List';
import Menu, {MenuItem} from 'material-ui/Menu';

const options = [
    'Votos',
    'Data',
];


class CategoryFilter extends Component {
    state = {
        anchorEl: null,
        open: false,
        selectedIndex: 0,
    };

    handleClickListItem = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (event, index) => {
        this.setState({selectedIndex: index, open: false});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        return (
            <div className="">
                <List>
                    <ListItem
                        button
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            primary="Ordenação"
                            secondary={options[this.state.selectedIndex]}
                        />
                    </ListItem>
                </List>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default CategoryFilter;