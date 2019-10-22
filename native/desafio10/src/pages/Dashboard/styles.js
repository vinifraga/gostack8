import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 30px 20px 0;
`;

export const DateBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  margin: 0 15px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 30px;
  align-self: stretch;
`;
