import {IntlProvider, addLocaleData} from 'react-intl';
import pt from 'react-intl/locale-data/pt';

import {DEFAULT_LOCALE, getLocale} from '../locale/locale';

import messages, {flattenMessages} from './messages';


function configureLocale(renderCallback) {
    addLocaleData(pt);
    renderCallback();
}

export function configureReactIntlPolyfill(renderCallback) {
    if (window.Intl) {
        configureLocale(renderCallback);
        return;
    }

    require.ensure([
            'intl',
            'intl/locale-data/jsonp/pt.js'
        ],
        require => {
            require('intl');
            require('intl/locale-data/jsonp/pt.js');

            configureLocale(renderCallback);
        }
    );
}

export function getIntlProviderConfig() {
    const locale = getLocale();
    const messages = getFlattedLocaleMessages();

    return {locale, messages};
}

export function getFlattedLocaleMessages() {
    let locale = getLocale();
    return flattenMessages(messages[locale] || messages[DEFAULT_LOCALE]);
}

export function getFormattedMessage(id) {
    const config = getIntlProviderConfig();

    return new IntlProvider(config, {})
        .getChildContext()
        .intl
        .formatMessage({id});
}