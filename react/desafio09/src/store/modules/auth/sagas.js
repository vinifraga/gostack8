import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';
import * as AuthActions from './actions';

function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/session', { email, password });

    const { token, user } = response.data;

    yield put(AuthActions.signInSuccess(token, user));

    history.push('/dashboard');
  } catch (error) {
    console.tron.log('erro no auth saga', error);
    yield put(AuthActions.signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
