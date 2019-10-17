import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import * as UserActions from '~/store/modules/user/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('E-mail inválido'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .min(6, 'Mínimo de 6 caracteres')
          .required('Nova senha é obrigatória')
          .notOneOf(
            [Yup.ref('oldPassword')],
            'A nova senha não pode ser igual à antiga'
          )
      : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Confirmação de senha é obrigatória')
          .oneOf(
            [Yup.ref('password')],
            'Nova senha e confirmação devem ser iguais'
          )
      : field
  ),
});

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    dispatch(UserActions.updateRequest(data));
  }
  return (
    <Container loading={loading ? 1 : 0}>
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu melhor e-mail" />

        <hr />

        <Input name="oldPassword" type="password" placeholder="Senha atual" />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />
        <div>
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <FaSpinner size={20} color="#FFF" />
                Salvando...
              </>
            ) : (
              <>
                <MdAddCircleOutline size={20} color="#FFF" />
                Salvar perfil
              </>
            )}
          </button>
        </div>
      </Form>
    </Container>
  );
}
