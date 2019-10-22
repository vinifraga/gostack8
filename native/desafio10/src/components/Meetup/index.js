import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  MeetupCard,
  MeetupBanner,
  MeetupTitle,
  MeetupInfo,
  MeetupInfoText,
  SubscribeButton,
} from './styles';

export default function Meetup({ data, onSubscription }) {
  return (
    <MeetupCard>
      <MeetupBanner
        source={{ uri: data.banner.url.replace('localhost', '192.168.0.15') }}
      />
      <MeetupTitle>{data.title}</MeetupTitle>
      <MeetupInfo>
        <Icon name="event" size={14} color="#999" />
        <MeetupInfoText>{data.formatedDate}</MeetupInfoText>
      </MeetupInfo>
      <MeetupInfo>
        <Icon name="place" size={14} color="#999" />
        <MeetupInfoText>{data.location}</MeetupInfoText>
      </MeetupInfo>
      <MeetupInfo>
        <Icon name="person" size={14} color="#999" />
        <MeetupInfoText>{data.organizer.name}</MeetupInfoText>
      </MeetupInfo>

      <SubscribeButton onPress={onSubscription}>
        Realizar inscrição
      </SubscribeButton>
    </MeetupCard>
  );
}
