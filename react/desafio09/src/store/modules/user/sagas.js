import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import * as UserActions from './actions';

function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const data = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, '/user', data);

    toast.success('Dados atualizados com sucesso');

    yield put(UserActions.updateSuccess(response.data));
  } catch (error) {
    toast.error('Erro na requisição, verifique seus dados');
    yield put(UserActions.updateFailure());
  }
}

export default all([takeLatest('@user/UPDATE_REQUEST', updateProfile)]);
