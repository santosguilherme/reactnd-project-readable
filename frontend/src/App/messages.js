export default {
    'pt-BR': {
        'LABELS': {},
        'MESSAGES': {}
    }
};

/**
 * https://egghead.io/lessons/react-convert-a-hard-coded-string-using-react-intl-formattedmessage
 */
export const flattenMessages = (nestedMessages, prefix = '') => {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey))
        }

        return messages;
    }, {});
};