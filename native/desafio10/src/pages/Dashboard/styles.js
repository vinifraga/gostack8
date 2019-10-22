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

export const LoadingContainer = styled.View`
  background: rgba(0, 0, 0, 0.2);
  align-self: stretch;
  padding: 50px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.Text`
  margin-top: 10px;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
`;
