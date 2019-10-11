import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

import * as AuthActions from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  async function handleSubmit({ email, password }) {
    dispatch(AuthActions.signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="MeetApp_Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button disabled={loading} type="submit">
          {loading ? <FaSpinner color="#FFF" /> : 'Entrar'}
        </button>
      </Form>
      <Link to="/register">Criar conta grátis</Link>
    </>
  );
}
