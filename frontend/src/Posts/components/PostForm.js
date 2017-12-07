import React from 'react';
import PropTypes from 'prop-types';

import {Field, reduxForm} from 'redux-form';

import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';

import {
    DefaultTextField,
    DefaultSelectField
} from '../../commons/redux-form/componentsRenderer';
import createValidate from '../../commons/redux-form/validatorUtils';


const PostForm = ({handleSubmit, invalid, submitting, onCancel, categories}) => {
    const selectOptions = [
        ...categories
    ];

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="author"
                label="Author"
                placeholder="Type post author"
                component={DefaultTextField}
            />
            <Field
                name="title"
                label="Title"
                placeholder="Type post title"
                component={DefaultTextField}
            />
            <Field
                name="body"
                label="Body"
                placeholder="Type post body"
                multiline={true}
                rowsMax={6}
                component={DefaultTextField}
            />
            <Field
                name="category"
                label="Category"
                placeholder="Select the post category"
                component={DefaultSelectField}
            >
                {selectOptions.map(option => (
                    <MenuItem
                        key={option.name}
                        value={option.path}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Field>
            <div align="right">
                <Button
                    onClick={onCancel}
                    color="primary"
                >
                    {'Cancelar'}
                </Button>
                <Button
                    color="primary"
                    type="submit"
                    disabled={invalid || submitting}
                >
                    {'Salvar post'}
                </Button>
            </div>
        </form>
    );
};

PostForm.propTypes = {
    categories: PropTypes.array.isRequired
};

export default reduxForm({
    form: 'PostForm',
    validate: createValidate(['title', 'body', 'author', 'category'])
})(PostForm);