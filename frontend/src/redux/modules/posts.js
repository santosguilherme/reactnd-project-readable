import {createAction, handleActions} from 'redux-actions';

/* Actions Types */
const GET_ALL_POSTS_REQUEST = 'services-portal/posts/GET_ALL_POSTS_REQUEST';
const GET_ALL_POSTS_SUCCESS = 'services-portal/posts/GET_ALL_POSTS_SUCCESS';
const GET_POST_REQUEST = 'services-portal/posts/GET_POST_REQUEST';
const GET_POST_SUCCESS = 'services-portal/posts/GET_POST_SUCCESS';

export const types = {
    GET_ALL_POSTS_REQUEST,
    GET_ALL_POSTS_SUCCESS,
    GET_POST_REQUEST,
    GET_POST_SUCCESS
};

/* Actions */
const getAllPosts = createAction(GET_ALL_POSTS_REQUEST);
const storagePosts = createAction(GET_ALL_POSTS_SUCCESS);
const getPostById = createAction(GET_POST_REQUEST);
const storagePost = createAction(GET_POST_SUCCESS);


export const actions = {
    getAllPosts,
    storagePosts,
    getPostById,
    storagePost
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