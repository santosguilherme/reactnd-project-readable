import {createAction, handleActions} from 'redux-actions';
import uuidv1 from 'uuid/v1';


/* Actions Types */
const GET_ALL_COMMENTS_FROM_POST_REQUEST = 'readable/comments/GET_ALL_COMMENTS_FROM_POST_REQUEST';
const UPDATE_COMMENTS_ARRAY = 'readable/comments/UPDATE_COMMENTS_ARRAY';

export const types = {
    GET_ALL_COMMENTS_FROM_POST_REQUEST,
    UPDATE_COMMENTS_ARRAY
};

/* Actions */
const getCommentsFromPost = createAction(GET_ALL_COMMENTS_FROM_POST_REQUEST);
const updateCommentsArray = createAction(UPDATE_COMMENTS_ARRAY);


export const actions = {
    getCommentsFromPost,
    updateCommentsArray
};

/* State */
const initialState = [];

/* Reducers */
export default handleActions({
    [UPDATE_COMMENTS_ARRAY]: (state, action) => ([
        ...action.payload
    ])
}, initialState);

/* Selectors */
const getComments = state => state.comments;

export const selectors = {
    getComments
};