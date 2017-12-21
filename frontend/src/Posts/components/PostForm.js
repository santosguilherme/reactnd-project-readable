import React from 'react';
import PropTypes from 'prop-types';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {injectIntl, FormattedMessage} from 'react-intl';

import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';

import {DefaultTextField, DefaultSelectField} from '../../commons/redux-form/componentsRenderer';
import createValidate from '../../commons/redux-form/validatorUtils';

import PostPropType from '../PostPropType';


function PostForm({intl, handleSubmit, invalid, submitting, onCancel, categories, post}) {
    const selectOptions = [
        ...categories
    ];
    const isEdit = Boolean(post.id);

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="author"
                label={intl.formatMessage({id: 'LABELS.POST_AUTHOR'})}
                placeholder={intl.formatMessage({id: 'LABELS.POST_AUTHOR_FORM_PLACEHOLDER'})}
                component={DefaultTextField}
                disabled={isEdit}
            />
            <Field
                name="title"
                label={intl.formatMessage({id: 'LABELS.POST_TITLE'})}
                placeholder={intl.formatMessage({id: 'LABELS.POST_TITLE_FORM_PLACEHOLDER'})}
                component={DefaultTextField}
            />
            <Field
                name="body"
                label={intl.formatMessage({id: 'LABELS.POST_BODY'})}
                placeholder={intl.formatMessage({id: 'LABELS.POST_BODY_FORM_PLACEHOLDER'})}
                multiline={true}
                rowsMax={6}
                component={DefaultTextField}
            />
            <Field
                name="category"
                label={intl.formatMessage({id: 'LABELS.POST_CATEGORY'})}
                placeholder={intl.formatMessage({id: 'LABELS.POST_CATEGORY_FORM_PLACEHOLDER'})}
                component={DefaultSelectField}
                disabled={isEdit}
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
                    <FormattedMessage id="LABELS.CANCEL"/>
                </Button>
                <Button
                    color="primary"
                    type="submit"
                    disabled={invalid || submitting}
                >
                    <FormattedMessage id="LABELS.POST_FORM_SAVE"/>
                </Button>
            </div>
        </form>
    );
};

PostForm.defaultProps = {
    post: {},
    categories: []
};

PostForm.propTypes = {
    post: PostPropType,
    categories: PropTypes.array.isRequired,
    /* intl */
    intl: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: {...ownProps.post}
    };
};

export default compose(
    connect(mapStateToProps),
    reduxForm({
        form: 'PostForm',
        validate: createValidate(['title', 'body', 'author', 'category'])
    }),
    injectIntl
)(PostForm);