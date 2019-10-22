import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import subscription from './subscription/sagas';

export default function* rootSaga() {
  yield all([auth, user, subscription]);
}
