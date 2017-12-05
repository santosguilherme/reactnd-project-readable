import {all} from 'redux-saga/effects';

import postsSaga from './postSaga';

export default function* watchMany() {
    yield all([
        postsSaga()
    ]);
};