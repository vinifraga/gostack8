import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  addDays,
  subDays,
  isBefore,
  startOfDay,
  format,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { ActivityIndicator, View, Alert } from 'react-native';

import api from '~/services/api';

import {
  Container,
  DateBox,
  DateText,
  MeetupsList,
  LoadingContainer,
  LoadingText,
} from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

export default function Dashboard({ navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [endOfList, setEndOfList] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/schedule', {
        params: {
          date,
          page: 1,
        },
      });

      setMeetups(response.data);
      setLoading(false);
    }

    loadMeetups();
  }, [date]);

  function nextDay() {
    setLoading(true);
    setDate(addDays(date, 1));
    setPage(1);
    setEndOfList(false);
  }

  function previousDay() {
    const newDate = subDays(date, 1);

    if (isBefore(newDate, startOfDay(new Date()))) return;

    setLoading(true);
    setDate(newDate);
    setPage(1);
    setEndOfList(false);
  }

  async function nextPage() {
    if (endOfList) return;

    if (meetups.length < 10) {
      setEndOfList(true);
      return;
    }

    const response = await api.get('/schedule', {
      params: {
        date,
        page: page + 1,
      },
    });

    if (response.data.length > 0) {
      setMeetups([...meetups, ...response.data]);
      setPage(page + 1);
    }

    if (response.data.length < 10) {
      setEndOfList(true);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);

    const response = await api.get('/schedule', {
      params: {
        date,
        page: 1,
      },
    });

    setMeetups(response.data);
    setPage(1);
    setEndOfList(false);
    setRefreshing(false);
  }

  async function handleSubscription(id) {
    try {
      await api.post('subscription', { meetup_id: id });

      Alert.alert('Sucesso', 'Inscrição realizada com sucesso');
      navigation.navigate('Subscriptions');
    } catch (error) {
      Alert.alert('Erro', 'Falha na inscrição');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateBox>
          <Icon
            name="chevron-left"
            onPress={previousDay}
            size={30}
            color="#FFF"
          />
          <DateText>{format(date, "dd 'de' MMMM", { locale: pt })}</DateText>
          <Icon name="chevron-right" onPress={nextDay} size={30} color="#FFF" />
        </DateBox>

        {loading ? (
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <LoadingContainer>
              <ActivityIndicator size={24} color="rgba(255, 255, 255, 0.6)" />
              <LoadingText>Buscando meetups...</LoadingText>
            </LoadingContainer>
          </View>
        ) : (
          <MeetupsList
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => {
              item.formatedDate = format(
                parseISO(item.date),
                "d 'de' MMMM 'de' yyyy, 'às' H'h'",
                {
                  locale: pt,
                }
              );
              return (
                <Meetup
                  onSubscription={() => handleSubscription(item.id)}
                  data={item}
                />
              );
            }}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={nextPage}
          />
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
