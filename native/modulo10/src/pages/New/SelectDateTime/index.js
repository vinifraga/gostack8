import React from 'react';
import { View } from 'react-native';

import { Container } from './styles';
import Background from '~/components/Background';

export default function SelectDateTime() {
  return (
    <Background>
      <Container />
    </Background>
  );
}

SelectDateTime.navigationOptions = {
  title: 'Selecione o horário',
};
