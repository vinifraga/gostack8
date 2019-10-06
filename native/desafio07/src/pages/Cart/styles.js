import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: #191920;
`;

export const ItemContainer = styled.View`
  background: #fff;
  padding: 22px 15px 10px;
  border-radius: 4px;
`;

export const ItemBox = styled.View`
  background: #fff;
  padding-bottom: 20px;
`;

export const UpperInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ItemImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const TextBox = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const ItemText = styled.Text``;

export const ItemPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const LowerInfo = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: #eee;
  padding: 7px 10px;
  border-radius: 4px;
`;

export const AmountBox = styled.View`
  flex-direction: row;
`;

export const AmountInput = styled.TextInput`
  height: 26px;
  padding: 5px 12px;
  margin: 0 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SubTotal = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const TotalBox = styled.View`
  align-items: center;
  margin-top: 10px;
`;

export const TotalText = styled.Text`
  font-weight: bold;
  color: #999;
`;

export const TotalPrice = styled.Text`
  font-weight: bold;
  font-size: 30px;
`;

export const FinishButton = styled(RectButton)`
  background: #7159c1;
  width: ${width - 60};
  margin-top: 30px;
  padding: 13px;
  border-radius: 4px;
`;

export const FinishButtonText = styled.Text`
  text-align: center;
  font-weight: bold;
  color: #fff;
`;
