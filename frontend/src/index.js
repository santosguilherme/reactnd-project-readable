import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Route} from 'react-router-dom';

import {registerAxiosInterceptors} from './App/axios';
import {configureReactIntlPolyfill} from './App/intl';
import configureStore from './redux/store';

import App from './App/App';

import 'typeface-roboto';

import './index.css';

import registerServiceWorker from './registerServiceWorker';


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
    //injectTapEventPlugin();
    registerAxiosInterceptors();
    configureReactIntlPolyfill(() => {
        renderApp(store);
        registerServiceWorker();
    });
}

startApp();