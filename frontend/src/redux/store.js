import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';

import rootReducer from './reducers';
import rootSaga from './middleware/sagas';
import history from '../commons/router/history';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);
  store.getHistory = () => history;

  return store;
}
