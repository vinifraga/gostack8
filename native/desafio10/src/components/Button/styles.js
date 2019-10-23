import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: ${props => (props.small ? '#d44059' : '#E5556E')};
  opacity: ${props => (!props.enabled ? 0.6 : 1)};
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 4px;
  height: ${props => (props.small ? '42px' : '50px')};
`;

export const Text = styled.Text`
  color: #fff;
  font-size: ${props => (props.small ? '16px' : '18px')};
  font-weight: bold;
`;
