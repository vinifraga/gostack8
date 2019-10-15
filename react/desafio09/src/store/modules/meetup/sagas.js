import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import * as MeetupActions from './actions';

function* indexMeetups() {
  try {
    const response = yield call(api.get, '/meetup');

    yield put(MeetupActions.indexSuccess(response.data));
  } catch (error) {
    toast.error('Falha na listagem');
    yield put(MeetupActions.failure());
  }
}

function* storeMeetup({ payload }) {
  try {
    const response = yield call(api.post, '/meetup', { payload });

    yield put(MeetupActions.storeSuccess(response.data));

    toast.success('Meetup criado com sucesso');
  } catch (error) {
    toast.error('Falha na criação do meetup, verifique seus dados');
    yield put(MeetupActions.failure());
    history.push('/dashboard');
  }
}

export default all([
  takeLatest('@meetup/INDEX_REQUEST', indexMeetups),
  takeLatest('@meetup/STORE_REQUEST', storeMeetup),
]);
