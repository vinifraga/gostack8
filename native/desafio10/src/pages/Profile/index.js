import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Alert } from 'react-native';

import { signOut } from '~/store/modules/auth/actions';
import { updateRequest } from '~/store/modules/user/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  Separator,
  LogOutButton,
} from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

export default function Profile() {
  const loading = useSelector(state => state.user.loading);
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email('E-mail inválido'),
    oldPassword: Yup.string(),
    password: Yup.string().when('oldPassword', (oldPasswordField, field) =>
      oldPasswordField
        ? field
            .min(6, 'Mínimo de 6 caracteres')
            .required('Nova senha é obrigatória')
            .notOneOf(
              [Yup.ref('oldPassword')],
              'A nova senha não pode ser igual à antiga'
            )
        : field
    ),
    confirmPassword: Yup.string().when('password', (passwordField, field) =>
      passwordField
        ? field
            .required('Confirmação de senha é obrigatória')
            .oneOf(
              [Yup.ref('password')],
              'Nova senha e confirmação devem ser iguais'
            )
        : field
    ),
  });

  async function handleSubmit() {
    try {
      await schema.validate({
        name,
        email,
        password,
        oldPassword,
        confirmPassword,
      });
      dispatch(
        updateRequest({ name, email, password, oldPassword, confirmPassword })
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="words"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => {
              oldPasswordRef.current.focus();
            }}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            value={oldPassword}
            onChangeText={setOldPassword}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <FormInput
            secureTextEntry
            placeholder="Sua nova senha"
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />

          <FormInput
            secureTextEntry
            placeholder="Confirmação de senha"
            ref={confirmPasswordRef}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton onPress={handleSubmit} loading={loading}>
            Salvar perfil
          </SubmitButton>

          <LogOutButton onPress={handleLogout}>Sair do Meetapp</LogOutButton>
        </Form>
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="person" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon,
};
