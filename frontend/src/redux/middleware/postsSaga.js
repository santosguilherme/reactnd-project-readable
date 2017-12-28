import {takeEvery, put} from 'redux-saga/effects';

import {types as postsTypes, actions as postsActions} from '../modules/posts';

import apiSaga from '../../commons/saga/apiSaga';
import postsService from '../../commons/services/posts';
import {getFormattedMessage} from '../../commons/i18n/intl';
import {showErrorMessage} from '../../commons/notifications/notifications';


function* getAllPosts() {
    yield* apiSaga(
        postsService.allPosts,
        {},
        postsActions.updatePostsArray
    );
}

function* getCategoryPosts(action) {
    const {payload} = action;

    yield* apiSaga(
        postsService.byCategory,
        payload,
        postsActions.updatePostsArray
    );
}

function* getPostById(action) {
    const {payload} = action;

    yield* apiSaga(
        postsService.byId,
        payload,
        function* (data) {
            yield put(data.id
                ? postsActions.addPostArrayItem(data)
                : showErrorMessage(getFormattedMessage('MESSAGES.POST_NOT_FOUND'))
            );
        },
        null,
        null,
        null,
        {callSuccessFunction: true}
    );
}

function* createPost(action) {
    const {payload} = action;

    yield* apiSaga(
        postsService.newPost,
        payload,
        postsActions.addPostArrayItem,
        'MESSAGES.POST_CREATE_SUCCESS'
    );
}

function* voteUpPost(action) {
    const {payload} = action;

    yield* apiSaga(
        postsService.voteUp,
        payload.id,
        postsActions.updatePostArrayItem,
        'MESSAGES.POST_VOTE_SUCCESS'
    );
}

function* voteDownPost(action) {
    const {payload} = action;

    yield* apiSaga(
        postsService.voteDown,
        payload.id,
        postsActions.updatePostArrayItem,
        'MESSAGES.POST_VOTE_SUCCESS'
    );
}

function* deletePost(action) {
    const {payload} = action;

    yield* apiSaga(
        postsService.remove,
        payload.id,
        postsActions.deletePostSuccess,
        'MESSAGES.POST_DELETE_SUCCESS'
    );
}

function* updatePost(action) {
    const {payload} = action;

    yield* apiSaga(
        postsService.updatePost,
        payload,
        postsActions.updatePostArrayItem,
        'MESSAGES.POST_UPDATE_SUCCESS'
    );
}

export default function* postsSaga() {
    yield takeEvery(postsTypes.GET_ALL_POSTS_REQUEST, getAllPosts);
    yield takeEvery(postsTypes.GET_CATEGORY_POSTS_REQUEST, getCategoryPosts);
    yield takeEvery(postsTypes.GET_POST_REQUEST, getPostById);
    yield takeEvery(postsTypes.NEW_POST_REQUEST, createPost);
    yield takeEvery(postsTypes.POST_VOTE_UP, voteUpPost);
    yield takeEvery(postsTypes.POST_VOTE_DOWN, voteDownPost);
    yield takeEvery(postsTypes.DELETE_POST_REQUEST, deletePost);
    yield takeEvery(postsTypes.UPDATE_POST_REQUEST, updatePost);
}