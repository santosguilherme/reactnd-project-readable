import {combineReducers} from 'redux';

import {routerReducer as router} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import {reducer as notifications} from 'react-notification-system-redux';

import loading from './modules/loading';
import categories from './modules/categories';
import posts from './modules/posts';
import comments from './modules/comments';
import postsFilter from './modules/postsFilter';


export default combineReducers({
    router,
    form,
    notifications,
    loading,
    categories,
    postsFilter,
    posts,
    comments
});