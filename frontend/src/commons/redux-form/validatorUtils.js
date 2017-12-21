import {getFormattedMessage} from '../i18n/intl';


export default function createValidate(fields) {
    return function (values) {
        const errors = {};
        const requiredFields = [...fields];

        //TODO: reduce em vez de forEach
        requiredFields.forEach(field => {
            if (!values[field]) {
                errors[field] = getFormattedMessage('MESSAGES.REQUIRED_FIELD');
            }
        });

        return errors;
    };
}