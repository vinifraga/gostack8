import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import * as Yup from 'yup';

import * as AuthActions from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Mínimo de 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  function handleSubmit({ name, email, password }) {
    dispatch(AuthActions.signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="MeetApp_Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button disabled={loading} type="submit">
          {loading ? <FaSpinner color="#FFF" /> : 'Cadastrar'}
        </button>
      </Form>
      <Link to="/">Ja tenho login</Link>
    </>
  );
}
