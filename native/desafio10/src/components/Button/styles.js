import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #f94d6a;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 4px;
  height: 50px;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
