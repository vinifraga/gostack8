import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import subscription from './subscription/reducer';

const reducers = combineReducers({ auth, user, subscription });

export default reducers;
