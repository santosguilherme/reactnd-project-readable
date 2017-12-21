import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Route} from 'react-router-dom';

import {registerAxiosInterceptors} from './commons/http/axios';
import {configureReactIntlPolyfill} from './commons/i18n/intl';
import configureStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import App from './App/App';

import 'typeface-roboto';

import './index.css';


function renderApp(store) {
    const history = store.getHistory();

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Route path="/" component={App}/>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    )
}

function startApp() {
    const store = configureStore();

    registerAxiosInterceptors();
    configureReactIntlPolyfill(() => {
        renderApp(store);
        registerServiceWorker();
    });
}

startApp();