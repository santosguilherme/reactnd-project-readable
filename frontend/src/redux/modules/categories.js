import {createAction, handleActions} from 'redux-actions';

/* Actions Types */
const GET_ALL_CATEGORIES_REQUEST = 'readable/categories/GET_ALL_CATEGORIES_REQUEST';
const GET_ALL_CATEGORIES_SUCCESS = 'readable/categories/GET_ALL_CATEGORIES_SUCCESS';

export const types = {
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS
};

/* Actions */
const getAllCategories = createAction(GET_ALL_CATEGORIES_REQUEST);
const storageCategories = createAction(GET_ALL_CATEGORIES_SUCCESS);

export const actions = {
    getAllCategories,
    storageCategories
};

/* State */
const initialState = [];

/* Reducers */
export default handleActions({
    [GET_ALL_CATEGORIES_SUCCESS]: (state, action) => ([
        ...action.payload.categories
    ])
}, initialState);

/* Selectors */
const getCategories = state => state.categories;

export const selectors = {
    getCategories
};