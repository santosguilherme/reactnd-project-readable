import {all} from 'redux-saga/effects';

import categoriesSaga from './categoriesSaga';
import postsSaga from './postsSaga';
import commentsSaga from './commentsSaga';


export default function* watchMany() {
    yield all([
        categoriesSaga(),
        postsSaga(),
        commentsSaga()
    ]);
};