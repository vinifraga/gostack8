import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import logo from '~/assets/Logo/Logo.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  Logo,
  SignLink,
  SignLinkText,
} from './styles';
import Background from '~/components/Background';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <Background>
      <Container>
        <Logo source={logo} />

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
              passwordRef.current.focus();
            }}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            secureTextEntry
            placeholder="Sua senha secreta"
            returnKeyType="send"
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton>Cadastrar</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho uma conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
