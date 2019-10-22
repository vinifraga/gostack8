import styled from 'styled-components/native';

import Button from '../Button';

export const MeetupCard = styled.View`
  margin-bottom: 20px;
  background: #fff;
  border-radius: 4px;
`;

export const MeetupBanner = styled.Image`
  height: 150px;
  align-self: stretch;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
`;

export const MeetupTitle = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-left: 18px;
`;

export const MeetupInfo = styled.View`
  margin: 10px 0 0 20px;
  flex-direction: row;
  align-items: center;
`;

export const MeetupInfoText = styled.Text`
  margin-left: 5px;
  font-size: 13px;
  color: #999;
`;

export const SubscribeButton = styled(Button)`
  margin: 15px 20px 20px;
`;
