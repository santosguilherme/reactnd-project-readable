import {delay} from 'redux-saga'
import {call, put} from 'redux-saga/effects';

import {actions as loadingActions} from '../../redux/modules/loading';
import {showErrorMessage, showSuccessMessage} from '../notifications/notifications';
import {getFormattedMessage} from '../i18n/intl';

const defaultSettings = {
    callSuccessFunction: false
};

export default function* apiSaga(fn, parameter, success, successMessageKey, failure, failureMessageKey, settings = {}) {
    const config = {...defaultSettings, ...settings};
    const {callSuccessFunction} = config;

    try {
        yield put(loadingActions.showLoading());

        const response = yield call(fn, parameter);
        const data = response ? response.data : {};

        if (success) {
            yield (callSuccessFunction ? call(success, data) : put(success(data)));
        }

        yield delay(1000);

        if (successMessageKey) {
            const successMessage = getFormattedMessage(successMessageKey);
            yield put(showSuccessMessage(successMessage));
        }

    } catch (error) {
        const failureMessage = failureMessageKey
            ? getFormattedMessage(failureMessageKey)
            : error;

        yield put(showErrorMessage(failureMessage));

        if (failure) {
            yield put(failure(error));
        }
    } finally {
        yield put(loadingActions.hideLoading());
    }
}