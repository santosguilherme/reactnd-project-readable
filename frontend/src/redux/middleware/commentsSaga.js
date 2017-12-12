import {takeEvery} from 'redux-saga/effects';

import {types as commentsTypes, actions as commentsActions} from '../modules/comments';

import apiSaga from '../../commons/saga/apiSaga';
import commentsService from '../../commons/services/comments';


function* getCommentsFromPost(action) {
    const {payload} = action;

    yield* apiSaga(
        commentsService.fromPost,
        payload,
        commentsActions.updateCommentsArray
    );
}

export default function* commentsSaga() {
    yield takeEvery(commentsTypes.GET_ALL_COMMENTS_FROM_POST_REQUEST, getCommentsFromPost);
}