import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 20px 10px;
  background: #141419;
  height: 64px;
`;

export const LogoBox = styled(BorderlessButton).attrs({
  rippleColor: '#555',
})`
  height: 64px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

export const LogoImage = styled.Image`
  width: 184px;
  height: 24px;
`;

export const Cart = styled(BorderlessButton).attrs({
  rippleColor: '#555',
})`
  flex-direction: row;
  height: 64px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

export const QuantityBox = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  margin-left: -10px;
  margin-top: -20px;
  background: #7159c1;
`;

export const QuantityText = styled.Text`
  color: #fff;
  margin: auto;
`;
