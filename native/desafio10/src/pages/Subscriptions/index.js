import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  indexRequest,
  deleteRequest,
} from '~/store/modules/subscription/actions';

import { Container, SubscriptionsList } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import Info from '~/components/Info';

export default function Subscriptions() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.subscription.loading);
  const subscriptions = useSelector(state => state.subscription.subscriptions);
  const refreshing = useSelector(state => state.subscription.refreshing);
  const buttonLoading = useSelector(state => state.subscription.buttonLoading);

  const [loadItem, setLoadItem] = useState(null);

  useEffect(() => {
    dispatch(indexRequest());
  }, [dispatch]);

  function handleRefresh() {
    dispatch(indexRequest(true));
  }

  function handleUnsubscription(id) {
    setLoadItem(id);
    dispatch(deleteRequest(id));
  }

  return (
    <Background>
      <Header />
      <Container>
        {loading ? (
          <Info loading contentText="Buscando inscrições..." />
        ) : subscriptions.length > 0 ? (
          <SubscriptionsList
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                load={loadItem === item.id && buttonLoading}
                onPressFunction={() => handleUnsubscription(item.id)}
                data={item.meetup}
              />
            )}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        ) : (
          <Info
            onReload={() => dispatch(indexRequest())}
            button
            contentText="Nenhuma inscrição encontrada"
          />
        )}
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscriptions.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon,
};
