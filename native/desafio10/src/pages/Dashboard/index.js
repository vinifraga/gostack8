import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addDays, subDays, isBefore, startOfDay, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import api from '~/services/api';
import { storeRequest } from '~/store/modules/subscription/actions';

import { Container, DateBox, DateText, MeetupsList } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import Info from '~/components/Info';

export default function Dashboard() {
  const dispatch = useDispatch();
  const buttonLoading = useSelector(state => state.subscription.buttonLoading);

  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [endOfList, setEndOfList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadItem, setLoadItem] = useState(null);

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
    setLoadItem(id);
    dispatch(storeRequest(id));
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
          <Info loading contentText="Buscando meetups..." />
        ) : meetups.length > 0 ? (
          <MeetupsList
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                load={loadItem === item.id && buttonLoading}
                onPressFunction={() => handleSubscription(item.id)}
                data={item}
                subscribe
              />
            )}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={nextPage}
          />
        ) : (
          <Info contentText="Nenhum meetup encontrado" />
        )}
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};
