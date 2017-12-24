import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {injectIntl} from 'react-intl';

import List, {ListItem, ListItemText} from 'material-ui/List';
import Menu, {MenuItem} from 'material-ui/Menu';

import CategoryPropType from '../Category/CategoryPropType';


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
        const {intl, options, selected} = this.props;
        const allCategoriesLabel = intl.formatMessage({id: 'LABELS.ALL_CATEGORIES'});
        const menuOptions = [{
            name: allCategoriesLabel,
            path: ''
        },
            ...options
        ];
        let selectedText = allCategoriesLabel;

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
                            primary={intl.formatMessage({id: 'LABELS.CATEGORY'})}
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
    options: PropTypes.arrayOf(CategoryPropType),
    /* intl */
    intl: PropTypes.object.isRequired
};

export default injectIntl(CategoryFilter);