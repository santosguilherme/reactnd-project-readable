import React, {Component} from 'react';
import PropTypes from 'prop-types';

import List, {ListItem, ListItemText} from 'material-ui/List';
import Menu, {MenuItem} from 'material-ui/Menu';


class CategoryFilter extends Component {
    state = {
        anchorEl: null,
        open: false,
        selectedIndex: undefined,
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
        const {options, selected} = this.props;
        const ALL_CATEGORIES_LABEL = 'Todas';
        const menuOptions = [
            {
                name: ALL_CATEGORIES_LABEL,
                path: ''
            },
            ...options
        ];
        let selectedText = ALL_CATEGORIES_LABEL;

        if (selected && options.length) {
            const selectedOption = options.find(option => option.path === selected);

            selectedOption &&
            selectedOption.name &&
            (selectedText = selectedOption.name);
        }

        return (
            <div>
                <List>
                    <ListItem
                        button
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            primary="Categoria"
                            secondary={selectedText}
                        />
                    </ListItem>
                </List>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    {menuOptions.map((option, index) => (
                        <MenuItem
                            key={option.name}
                            selected={option.path === selected}
                            onClick={event => this.handleMenuItemClick(event, index, option.path)}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

CategoryFilter.defaultProps = {
    selected: '',
    options: []
};

CategoryFilter.propTypes = {
    selected: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }))
};

export default CategoryFilter;