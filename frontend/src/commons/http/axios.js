import axios from 'axios';

import {getFormattedMessage} from '../i18n/intl';


export const registerAxiosInterceptors = () => {
    axios.interceptors.request.use(config => {
            config.headers = config.headers || {};

            config.headers['Authorization'] = 'whatever-you-want';

            return config;
        },
        error => Promise.reject(error)
    );

    axios.interceptors.response.use(response => response, (error) => {
        const unknownError = !error || !error.response || !error.response.data || !error.response.data.message;
        let message = unknownError && getFormattedMessage('MESSAGES.UNKNOWN_ERROR');

        if (!unknownError && typeof error.response.data.message === 'string') {
            message = error.response.data.message;
        }

        if (error.response.status === 404) {
            message = getFormattedMessage('MESSAGES.HTTP_NOT_FOUND');
        }

        return Promise.reject(message);
    });
};