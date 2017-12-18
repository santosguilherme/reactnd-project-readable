import React from 'react';
import PropTypes from 'prop-types';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import Button from 'material-ui/Button';

import {DefaultTextField} from '../../../../commons/redux-form/componentsRenderer';
import createValidate from '../../../../commons/redux-form/validatorUtils';


const PostCommentForm = ({handleSubmit, invalid, submitting, onCancel, comment}) => {
    const isEdit = Boolean(comment.id);

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="author"
                label="Author"
                placeholder="Type comment author"
                component={DefaultTextField}
                disabled={isEdit}
            />
            <Field
                name="body"
                label="Body"
                placeholder="Type comment body"
                multiline={true}
                rowsMax={6}
                component={DefaultTextField}
            />
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
                    {'Salvar comment'}
                </Button>
            </div>
        </form>
    );
};

PostCommentForm.defaultProps = {
    comment: {}
};

PostCommentForm.propTypes = {
    comment: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: {...ownProps.comment}
    };
};

export default compose(
    connect(mapStateToProps),
    reduxForm({
        form: 'PostCommentForm',
        validate: createValidate(['body', 'author'])
    })
)(PostCommentForm);