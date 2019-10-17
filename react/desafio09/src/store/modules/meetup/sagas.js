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
    const { data } = payload;

    const response = yield call(api.post, '/meetup', data);

    yield put(MeetupActions.storeSuccess(response.data));

    toast.success('Meetup criado com sucesso');
    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha na criação do meetup, verifique seus dados');
    yield put(MeetupActions.failure());
  }
}

function* updateMeetup({ payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(api.put, `/meetup/${id}`, data);

    yield put(MeetupActions.storeSuccess(response.data));

    toast.success('Meetup atualizado com sucesso');
    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha na atualização do meetup, verifique seus dados');
    yield put(MeetupActions.failure());
  }
}

function* deleteMeetup({ payload }) {
  try {
    const { id, bannerId } = payload;

    yield all([
      call(api.delete, `/meetup/${id}`),
      call(api.delete, `/file/${bannerId}`),
    ]);

    toast.info('Meetup cancelado');
    history.push('/dashboard');

    yield put(MeetupActions.deleteSuccess());
  } catch (error) {
    toast.error('Falha no cancelamento');
    yield put(MeetupActions.failure());
  }
}

export default all([
  takeLatest('@meetup/INDEX_REQUEST', indexMeetups),
  takeLatest('@meetup/STORE_REQUEST', storeMeetup),
  takeLatest('@meetup/UPDATE_REQUEST', updateMeetup),
  takeLatest('@meetup/DELETE_REQUEST', deleteMeetup),
]);
