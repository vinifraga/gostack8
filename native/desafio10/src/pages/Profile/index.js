import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

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

  function handleSubmit() {
    dispatch(
      updateRequest({ name, email, password, oldPassword, confirmPassword })
    );
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
