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

function* voteUpComment(action) {
    const {payload} = action;

    yield* apiSaga(
        commentsService.voteUp,
        payload.id,
        commentsActions.updateCommentsArrayItem
    );
}

function* voteDownComment(action) {
    const {payload} = action;

    yield* apiSaga(
        commentsService.voteDown,
        payload.id,
        commentsActions.updateCommentsArrayItem
    );
}

function* deleteComment(action) {
    const {payload} = action;

    yield* apiSaga(
        commentsService.remove,
        payload.id,
        commentsActions.deleteCommentSuccess
    );
}

function* updateComment(action) {
    const {payload} = action;

    yield* apiSaga(
        commentsService.updateComment,
        payload,
        commentsActions.updateCommentsArrayItem
    );
}

function* createComment(action) {
    const {payload} = action;

    yield* apiSaga(
        commentsService.newComment,
        payload,
        commentsActions.addCommentsArrayItem
    );
}

export default function* commentsSaga() {
    yield takeEvery(commentsTypes.GET_ALL_COMMENTS_FROM_POST_REQUEST, getCommentsFromPost);
    yield takeEvery(commentsTypes.COMMENT_VOTE_UP, voteUpComment);
    yield takeEvery(commentsTypes.COMMENT_VOTE_DOWN, voteDownComment);
    yield takeEvery(commentsTypes.DELETE_COMMENT_REQUEST, deleteComment);
    yield takeEvery(commentsTypes.UPDATE_COMMENT_REQUEST, updateComment);
    yield takeEvery(commentsTypes.NEW_COMMENT_REQUEST, createComment);
}