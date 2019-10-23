import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  justify-content: center;
  flex: 1;
`;

export const Content = styled(RectButton)`
  background: rgba(0, 0, 0, 0.2);
  align-self: stretch;
  padding: 50px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  text-align: center;
  margin-top: 10px;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
`;
