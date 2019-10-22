import { compose, applyMiddleware, createStore } from 'redux';

export default function(reducers, middlewares) {
  const enhancer = __DEV__
    ? compose(
        applyMiddleware(...middlewares),
        console.tron.createEnhancer()
      )
    : compose(applyMiddleware(...middlewares));

  return createStore(reducers, enhancer);
}
