import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';

import rootReducer, {
  initialState as initialStateSample,
} from './reducers/index';

export default function (history, initialState = initialStateSample) {

  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  const enhancers = [];

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
  );

  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers,
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
