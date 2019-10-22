import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 20px;
`;

export const SubscriptionsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 30px;
  align-self: stretch;
`;
