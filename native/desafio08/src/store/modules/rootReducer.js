import { combineReducers } from 'redux';

import cart from './cart/reducer';

const reducers = combineReducers({
  cart,
});

export default reducers;
