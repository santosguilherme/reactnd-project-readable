import {combineReducers} from 'redux';

import {routerReducer as router} from 'react-router-redux';

import posts from './modules/posts';

export default combineReducers({
    router,
    posts,
});