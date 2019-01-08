// @flow
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './Reducers';
import sagas from './Sagas';

export default function configureStore(reactotronStoreAction: any, INITIAL_STATE: any = {}) {
  const middleware = [];
  const sagaMiddleware = createSagaMiddleware();

  middleware.push(sagaMiddleware);
  const store = (reactotronStoreAction || createStore)(reducers, INITIAL_STATE, applyMiddleware(...middleware));

  sagaMiddleware.run(sagas);

  return store;
}
