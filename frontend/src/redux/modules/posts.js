import {createAction, handleActions} from 'redux-actions';
import uuidv1 from 'uuid/v1';

import {sortBy} from '../../commons/array/arrayUtils';
import {updateItemInArray} from '../reducersUtils';


/* Actions Types */
const GET_ALL_POSTS_REQUEST = 'readable/posts/GET_ALL_POSTS_REQUEST';
const GET_CATEGORY_POSTS_REQUEST = 'readable/posts/GET_CATEGORY_POSTS_REQUEST';
//FIXME: mudar nome da action
const GET_ALL_POSTS_SUCCESS = 'readable/posts/GET_ALL_POSTS_SUCCESS';
const GET_POST_REQUEST = 'readable/posts/GET_POST_REQUEST';
const GET_POST_SUCCESS = 'readable/posts/GET_POST_SUCCESS';
const NEW_POST_REQUEST = 'readable/posts/NEW_POST_REQUEST';
const POST_VOTE_UP = 'readable/posts/POST_VOTE_UP';
const POST_VOTE_DOWN = 'readable/posts/POST_VOTE_DOWN';
const UPDATE_POST_ARRAY_ITEM = 'readable/posts/UPDATE_POST_ARRAY_ITEM';
const DELETE_POST_REQUEST = 'readable/posts/DELETE_POST_REQUEST';
const DELETE_POST_SUCCESS = 'readable/posts/DELETE_POST_SUCCESS';
const UPDATE_POST_REQUEST = 'readable/posts/UPDATE_POST_REQUEST';

export const types = {
    GET_ALL_POSTS_REQUEST,
    GET_CATEGORY_POSTS_REQUEST,
    GET_ALL_POSTS_SUCCESS,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    NEW_POST_REQUEST,
    POST_VOTE_UP,
    POST_VOTE_DOWN,
    UPDATE_POST_ARRAY_ITEM,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    UPDATE_POST_REQUEST
};

/* Actions */
const getAllPosts = createAction(GET_ALL_POSTS_REQUEST);
const getCategoryPosts = createAction(GET_CATEGORY_POSTS_REQUEST);
const storagePosts = createAction(GET_ALL_POSTS_SUCCESS);
const getPostById = createAction(GET_POST_REQUEST);
const storagePost = createAction(GET_POST_SUCCESS);
const saveNewPost = post => {
    return createAction(NEW_POST_REQUEST)({
        id: uuidv1(),
        timestamp: Date.now(),
        ...post
    });
};
const voteUp = createAction(POST_VOTE_UP);
const voteDown = createAction(POST_VOTE_DOWN);
const updatePostArrayItem = createAction(UPDATE_POST_ARRAY_ITEM);
const deletePost = createAction(DELETE_POST_REQUEST);
const deletePostSuccess = createAction(DELETE_POST_SUCCESS);
const updatePost = createAction(UPDATE_POST_REQUEST);

export const actions = {
    getAllPosts,
    getCategoryPosts,
    storagePosts,
    getPostById,
    storagePost,
    saveNewPost,
    voteUp,
    voteDown,
    updatePostArrayItem,
    deletePost,
    deletePostSuccess,
    updatePost
};

/* State */
const initialState = [];

/* Reducers */
export default handleActions({
    [GET_ALL_POSTS_SUCCESS]: (state, action) => ([
        ...action.payload
    ]),
    [GET_POST_SUCCESS]: (state, action) => ([
        ...state,
        action.payload
    ]),
    [UPDATE_POST_ARRAY_ITEM]: (state, action) => {
        return updateItemInArray(state, action.payload.id, vote => action.payload);
    },
    [DELETE_POST_SUCCESS]: (state, action) => {
        return state.filter(post => post.id !== action.payload.id);
    }
}, initialState);

/* Selectors */
const getPosts = (state, orderBy, category) => {
    let filtredPosts = [...state.posts];

    if (category) {
        filtredPosts = filtredPosts.filter(post => post.category === category);
    }

    if (orderBy) {
        filtredPosts = sortBy(filtredPosts, orderBy);
    }

    return filtredPosts;
};
const getPost = (state, postId) => state.posts.find(post => post.id === postId);

export const selectors = {
    getPosts,
    getPost
};