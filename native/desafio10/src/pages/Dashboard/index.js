import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';

export default function Dashboard() {
  return (
    <Background>
      <Header />
      <Button>Teste</Button>
      <Container />
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
