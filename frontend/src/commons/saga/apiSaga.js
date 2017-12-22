import {call, put} from 'redux-saga/effects';

import {showErrorMessage, showSuccessMessage} from '../notifications/notifications';
import {getFormattedMessage} from '../i18n/intl';


export default function* apiSaga(fn, parameter, success, successMessageKey, failure, failureMessageKey) {
    try {
        //yield put(remoteDataActions.start(scope));

        const response = yield call(fn, parameter);
        const data = response ? response.data : {};

        //yield put(remoteDataActions.complete(scope, data));

        if (success) {
            yield put(success(data));
        }

        if (successMessageKey) {
            const successMessage = getFormattedMessage(successMessageKey);
            yield put(showSuccessMessage(successMessage));
        }
    } catch (error) {
        //yield put(remoteDataActions.failure(scope, error));

        const failureMessage = failureMessageKey
            ? getFormattedMessage(failureMessageKey)
            : error;

        yield put(showErrorMessage(failureMessage));

        if (failure) {
            yield put(failure(error));
        }
    } finally {
        console.log('finally saga');
    }
}