import {createAction, handleActions} from 'redux-actions';
import uuidv1 from 'uuid/v1';


/* Actions Types */
const GET_ALL_POSTS_REQUEST = 'services-portal/posts/GET_ALL_POSTS_REQUEST';
const GET_ALL_POSTS_SUCCESS = 'services-portal/posts/GET_ALL_POSTS_SUCCESS';
const GET_POST_REQUEST = 'services-portal/posts/GET_POST_REQUEST';
const GET_POST_SUCCESS = 'services-portal/posts/GET_POST_SUCCESS';
const NEW_POST_REQUEST = 'readable/posts/NEW_POST_REQUEST';

export const types = {
    GET_ALL_POSTS_REQUEST,
    GET_ALL_POSTS_SUCCESS,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    NEW_POST_REQUEST
};

/* Actions */
const getAllPosts = createAction(GET_ALL_POSTS_REQUEST);
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


export const actions = {
    getAllPosts,
    storagePosts,
    getPostById,
    storagePost,
    saveNewPost
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
    ])
}, initialState);

/* Selectors */
const getPosts = state => state.posts;
const getPost = (state, postId) => state.posts.find(post => post.id === postId);

export const selectors = {
    getPosts,
    getPost
};