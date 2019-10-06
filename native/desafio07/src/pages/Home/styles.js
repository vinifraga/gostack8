import styled from 'styled-components/native';
import { darken } from 'polished';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background: #191920;
  padding: 20px 5px 20px 20px;
`;

export const ItemBox = styled.View`
  justify-content: flex-start;
  background: #fff;
  border-radius: 4px;
  width: 220px;
  height: 358px;
  margin-right: 15px;
  padding: 10px;
`;

export const ItemImage = styled.Image`
  height: 200px;
  width: 200px;
`;

export const ItemTitle = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin-top: 10px;
  padding: 0 10px;
  font-size: 16px;
`;

export const ItemPrice = styled.Text`
  margin-top: 5px;
  padding: 0 10px;
  font-size: 21px;
  font-weight: bold;
`;

export const AddProduct = styled(RectButton)`
  flex-direction: row;
  margin: 14px 10px 0 10px;
  border-radius: 4px;
  background: #7159c1;
`;

export const QuantityText = styled.Text`
  color: #fff;
`;

export const QuantityBox = styled.View`
  flex-direction: row;
  padding: 10px;
  background: ${darken(0.1, '#7159c1')};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const AddButtonText = styled.Text`
  margin: 0 auto;
  font-weight: bold;
  padding: 10px;
  color: #fff;
  font-size: 14px;
`;
