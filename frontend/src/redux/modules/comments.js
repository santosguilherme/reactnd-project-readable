import {createAction, handleActions} from 'redux-actions';
import uuidv1 from 'uuid/v1';


/* Actions Types */
const GET_ALL_COMMENTS_FROM_POST_REQUEST = 'readable/comments/GET_ALL_COMMENTS_FROM_POST_REQUEST';
const UPDATE_COMMENTS_ARRAY = 'readable/comments/UPDATE_COMMENTS_ARRAY';
const ADD_COMMENTS_ARRAY_ITEM = 'readable/comments/ADD_COMMENTS_ARRAY_ITEM';
const UPDATE_COMMENTS_ARRAY_ITEM = 'readable/comments/UPDATE_COMMENTS_ARRAY_ITEM';
const COMMENT_VOTE_UP = 'readable/comments/COMMENT_VOTE_UP';
const COMMENT_VOTE_DOWN = 'readable/comments/COMMENT_VOTE_DOWN';
const NEW_COMMENT_REQUEST = 'readable/comments/NEW_COMMENT_REQUEST';
const DELETE_COMMENT_REQUEST = 'readable/comments/DELETE_COMMENT_REQUEST';
const DELETE_COMMENT_SUCCESS = 'readable/comments/DELETE_COMMENT_SUCCESS';
const UPDATE_COMMENT_REQUEST = 'readable/comments/UPDATE_COMMENT_REQUEST';

export const types = {
    GET_ALL_COMMENTS_FROM_POST_REQUEST,
    UPDATE_COMMENTS_ARRAY,
    COMMENT_VOTE_UP,
    COMMENT_VOTE_DOWN,
    UPDATE_COMMENTS_ARRAY_ITEM,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    UPDATE_COMMENT_REQUEST,
    NEW_COMMENT_REQUEST,
    ADD_COMMENTS_ARRAY_ITEM
};

/* Actions */
const getCommentsFromPost = createAction(GET_ALL_COMMENTS_FROM_POST_REQUEST);
const updateCommentsArray = createAction(UPDATE_COMMENTS_ARRAY);
const voteUp = createAction(COMMENT_VOTE_UP);
const voteDown = createAction(COMMENT_VOTE_DOWN);
const updateCommentsArrayItem = createAction(UPDATE_COMMENTS_ARRAY_ITEM);
const deleteComment = createAction(DELETE_COMMENT_REQUEST);
const deleteCommentSuccess = createAction(DELETE_COMMENT_SUCCESS);
const updateComment = createAction(UPDATE_COMMENT_REQUEST);
const saveNewComment = comment => {
    return createAction(NEW_COMMENT_REQUEST)({
        id: uuidv1(),
        timestamp: Date.now(),
        ...comment
    });
};
const addCommentsArrayItem = createAction(ADD_COMMENTS_ARRAY_ITEM);

export const actions = {
    getCommentsFromPost,
    updateCommentsArray,
    updateCommentsArrayItem,
    voteUp,
    voteDown,
    deleteComment,
    deleteCommentSuccess,
    updateComment,
    saveNewComment,
    addCommentsArrayItem
};

/* State */
const initialState = [];

/* Reducers */
export default handleActions({
    [ADD_COMMENTS_ARRAY_ITEM]: (state, action) => ([
        ...state,
        action.payload
    ]),
    [UPDATE_COMMENTS_ARRAY]: (state, action) => ([
        ...action.payload
    ]),
    [UPDATE_COMMENTS_ARRAY_ITEM]: (state, action) => {
        return updateItemInArray(state, action.payload.id, vote => action.payload);
    },
    [DELETE_COMMENT_SUCCESS]: (state, action) => {
        return state.filter(post => post.id !== action.payload.id);
    }
}, initialState);

/* Selectors */
const getComments = state => state.comments;

export const selectors = {
    getComments
};

function updateItemInArray(array, itemId, updateItemCallback) {
    return array.map(item => {
        if (item.id !== itemId) {
            // Since we only want to update one item, preserve all others as they are now
            return item;
        }

        // Use the provided callback to create an updated item
        return updateItemCallback(item);
    });
}