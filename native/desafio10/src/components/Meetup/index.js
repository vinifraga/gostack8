import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  MeetupCard,
  MeetupBanner,
  MeetupTitle,
  MeetupInfo,
  MeetupInfoText,
  SubscribeButton,
} from './styles';

export default function Meetup({ data, onPressFunction, load, subscribe }) {
  return (
    <MeetupCard>
      <MeetupBanner
        source={{ uri: data.banner.url.replace('localhost', '192.168.0.15') }}
      />
      <MeetupTitle>{data.title}</MeetupTitle>
      <MeetupInfo>
        <Icon name="event" size={14} color="#999" />
        <MeetupInfoText>
          {format(parseISO(data.date), "d 'de' MMMM 'de' yyyy, 'às' H'h'", {
            locale: pt,
          })}
        </MeetupInfoText>
      </MeetupInfo>
      <MeetupInfo>
        <Icon name="place" size={14} color="#999" />
        <MeetupInfoText>{data.location}</MeetupInfoText>
      </MeetupInfo>
      <MeetupInfo>
        <Icon name="person" size={14} color="#999" />
        <MeetupInfoText>{data.organizer.name}</MeetupInfoText>
      </MeetupInfo>
      {subscribe ? (
        <SubscribeButton
          loading={load}
          style={{ backgroundColor: '#f94d6a' }}
          small
          onPress={onPressFunction}
        >
          Realizar inscrição
        </SubscribeButton>
      ) : (
        <SubscribeButton loading={load} small onPress={onPressFunction}>
          Cancelar inscrição
        </SubscribeButton>
      )}
    </MeetupCard>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    banner: PropTypes.shape({
      url: PropTypes.string,
    }),
    organizer: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onPressFunction: PropTypes.func.isRequired,
  load: PropTypes.bool,
  subscribe: PropTypes.bool,
};

Meetup.defaultProps = {
  load: false,
  subscribe: false,
};
