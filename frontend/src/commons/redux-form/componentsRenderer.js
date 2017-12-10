import React from 'react';

import TextField from 'material-ui/TextField';

import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Select from 'material-ui/Select';


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
    const {label, placeholder, disabled, input: {value, onChange, name}, meta: {touched, error}, children} = props;

    const handleChange = event => {
        onChange(event.target.value);
    };

    const hasError = Boolean(touched && error);

    return (
        <FormControl
            error={hasError}
            margin="normal"
            disabled={disabled}
            fullWidth
        >
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={handleChange}
                input={
                    <Input
                        name={name}
                        error={hasError}
                        placeholder={placeholder}
                    />
                }
                placeholder={placeholder}
            >
                {children}
            </Select>
            <FormHelperText>{hasError ? error : ''}</FormHelperText>
        </FormControl>
    );
};