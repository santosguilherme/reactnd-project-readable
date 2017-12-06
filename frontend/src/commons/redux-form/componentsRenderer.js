import React from 'react';

import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';


export const DefaultTextField = (props) => {
    const {input, meta: {touched, error}, ...custom} = props;

    return (
        <TextField
            error={Boolean(touched && error)}
            helperText={touched && error ? error : ''}
            {...input}
            {...custom}
            fullWidth
            InputLabelProps={{
                shrink: true
            }}
            margin="normal"
        />
    );
};

export const DefaultSelectField = (props) => {
    const {input, meta: {touched, error}, options, ...custom} = props;

    return (
        <TextField
            select
            error={Boolean(touched && error)}
            helperText={touched && error ? error : ''}
            {...input}
            {...custom}
            fullWidth
            InputLabelProps={{
                shrink: true
            }}
            margin="normal"
            onChange={(event, index, value) => input.onChange(value)}
            children={createSelectFieldItems(options)}
        />
    );
};

export const createSelectFieldItems = (options) => {
    const selectOptions = [
        {label: 'Selecione uma opção', value: ''},
        ...options
    ];
    return selectOptions.map(option => (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
    ));
};