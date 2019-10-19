import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

import api from '~/services/api';

import { Container, HourList, Hour, Title } from './styles';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`/providers/${provider.id}/available`, {
        params: {
          date,
        },
      });

      setHours(response.data);
    }

    loadAvailable();
  }, [date, provider, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
      </Container>

      <HourList
        data={hours}
        keyExtractor={item => String(item.time)}
        renderItem={({ item }) => (
          <Hour
            onPress={() => handleSelectHour(item.value)}
            enabled={item.available}
          >
            <Title>{item.time}</Title>
          </Hour>
        )}
      />
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
