import {combineReducers} from 'redux';

import {routerReducer as router} from 'react-router-redux';
import {reducer as form} from 'redux-form'


import posts from './modules/posts';
import categories from './modules/categories';


export default combineReducers({
    router,
    form,
    posts,
    categories
});