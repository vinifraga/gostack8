import { takeLatest, all, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import {
  indexSuccess,
  storeSuccess,
  requestFailure,
  deleteSuccess,
} from './actions';

function* indexSubscriptions() {
  try {
    const response = yield call(api.get, 'subscription');

    yield put(indexSuccess(response.data));
  } catch (error) {
    Alert.alert('Erro', 'Falha na listagem das inscrições');
    yield put(requestFailure());
  }
}

function* storeSubscription({ payload }) {
  try {
    const { meetup_id } = payload;

    const response = yield call(api.post, 'subscription', { meetup_id });

    Alert.alert('Sucesso', 'Inscrição realizada com sucesso');
    yield put(storeSuccess(response.data));
    // redirecionar para inscrições
  } catch (error) {
    Alert.alert('Erro', 'Falha na inscrição');
    yield put(requestFailure());
  }
}

function* deleteSubscription({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `subscription/${id}`);

    Alert.alert('Sucesso', 'Inscrição cancelada com sucesso');
    yield put(deleteSuccess(id));
  } catch (error) {
    Alert.alert('Erro', 'Falha no cancelamento da inscrição');
  }
}

export default all([
  takeLatest('@subscription/INDEX_REQUEST', indexSubscriptions),
  takeLatest('@subscription/STORE_REQUEST', storeSubscription),
  takeLatest('@subscription/DELETE_REQUEST', deleteSubscription),
]);
