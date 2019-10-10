import { compose, applyMiddleware, createStore } from 'redux';

export default function(reducers, middlewares) {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(
          applyMiddleware(...middlewares),
          console.tron.createEnhancer()
        )
      : compose(applyMiddleware(...middlewares));

  return createStore(reducers, enhancer);
}
