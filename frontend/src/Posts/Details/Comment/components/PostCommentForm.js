import React from 'react';
import PropTypes from 'prop-types';

import {compose} from 'redux';
import {connect} from 'react-redux';

import {Field, reduxForm} from 'redux-form';
import {injectIntl, FormattedMessage} from 'react-intl';

import Button from 'material-ui/Button';

import {DefaultTextField} from '../../../../commons/redux-form/componentsRenderer';
import createValidate from '../../../../commons/redux-form/validatorUtils';

import CommentPropType from '../CommentPropType';


function PostCommentForm({intl, handleSubmit, invalid, submitting, onCancel, comment}) {
    const isEdit = Boolean(comment.id);

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="author"
                label={intl.formatMessage({id: 'LABELS.COMMENT_AUTHOR'})}
                placeholder={intl.formatMessage({id: 'LABELS.COMMENT_AUTHOR_FORM_PLACEHOLDER'})}
                component={DefaultTextField}
                disabled={isEdit}
            />
            <Field
                name="body"
                label={intl.formatMessage({id: 'LABELS.COMMENT_BODY'})}
                placeholder={intl.formatMessage({id: 'LABELS.COMMENT_BODY_FORM_PLACEHOLDER'})}
                multiline={true}
                rowsMax={6}
                component={DefaultTextField}
            />
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
                    <FormattedMessage id="LABELS.COMMENT_FORM_SAVE"/>
                </Button>
            </div>
        </form>
    );
}

PostCommentForm.defaultProps = {
    comment: {}
};

PostCommentForm.propTypes = {
    comment: CommentPropType,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    /* intl */
    intl: PropTypes.object.isRequired
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
    }),
    injectIntl
)(PostCommentForm);