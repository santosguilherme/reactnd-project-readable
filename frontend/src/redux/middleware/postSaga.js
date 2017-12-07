import {takeEvery} from 'redux-saga/effects';

import {types as postsTypes, actions as postsActions} from '../modules/posts';

import apiSaga from '../../commons/saga/apiSaga';
import postsService from '../../commons/services/posts';


function* getAllPosts() {
    yield* apiSaga(
        postsService.allPosts,
        {},
        postsActions.storagePosts
    );
}

function* getPostById(action) {
    const {payload} = action;

    yield* apiSaga(
        postsService.byId,
        payload,
        postsActions.storagePost
    );
}

function* createPost(action) {
    const {payload} = action;

    yield* apiSaga(
        postsService.newPost,
        payload,
        postsActions.storagePost
    );
}

export default function* postsSaga() {
    yield takeEvery(postsTypes.GET_ALL_POSTS_REQUEST, getAllPosts);
    yield takeEvery(postsTypes.GET_POST_REQUEST, getPostById);
    yield takeEvery(postsTypes.NEW_POST_REQUEST, createPost);

}