import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity } from 'react-native';

// import { Container } from './styles';
import Background from '~/components/Background';

export default function SelectProvider() {
  return <Background />;
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
