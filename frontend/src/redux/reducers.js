import {combineReducers} from 'redux';

import {routerReducer as router} from 'react-router-redux';
import {reducer as form} from 'redux-form'


import posts from './modules/posts';

export default combineReducers({
    router,
    form,
    posts,
});