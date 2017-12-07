import {takeEvery} from 'redux-saga/effects';

import {types as categoriesTypes, actions as categoriesActions} from '../modules/categories';

import apiSaga from '../../commons/saga/apiSaga';
import categoriesService from '../../commons/services/categories';


function* getAllCategories() {
    yield* apiSaga(
        categoriesService.query,
        {},
        categoriesActions.storageCategories,
        null
    );
}

export default function* categoriesSaga() {
    yield takeEvery(categoriesTypes.GET_ALL_CATEGORIES_REQUEST, getAllCategories);

}