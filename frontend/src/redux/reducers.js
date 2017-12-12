import {combineReducers} from 'redux';

import {routerReducer as router} from 'react-router-redux';
import {reducer as form} from 'redux-form'


import categories from './modules/categories';
import posts from './modules/posts';
import comments from './modules/comments';


export default combineReducers({
    router,
    form,
    categories,
    posts,
    comments
});