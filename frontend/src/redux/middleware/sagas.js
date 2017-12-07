import {all} from 'redux-saga/effects';

import postsSaga from './postSaga';
import categoriesSaga from './categoriesSaga';


export default function* watchMany() {
    yield all([
        postsSaga(),
        categoriesSaga()
    ]);
};