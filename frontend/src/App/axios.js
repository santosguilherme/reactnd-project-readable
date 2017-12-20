import axios from 'axios';

import {getFormattedMessage} from './intl';


export const registerAxiosInterceptors = () => {
    axios.interceptors.request.use(config => {
            config.headers = config.headers || {};

            config.headers['Authorization'] = 'whatever-you-want';

            return config;
        },
        error => Promise.reject(error)
    );

    axios.interceptors.response.use(response => response, (error) => {
        debugger;
        const unknownError = !error || !error.response || !error.response.data || !error.response.data.message;
        let message = unknownError && getFormattedMessage('MESSAGES.COMMONS.UNKNOWN_ERROR');

        if (!unknownError && typeof error.response.data.message === 'string') {
            message = error.response.data.message;
        }

        if (error.response.status === 404) {
            message = getFormattedMessage('MESSAGES.COMMONS.HTTP_NOT_FOUND');
        }

        return Promise.reject(message);
    });
};