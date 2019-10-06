import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  ItemContainer,
  ItemBox,
  UpperInfo,
  ItemImage,
  TextBox,
  ItemText,
  ItemPrice,
  LowerInfo,
  AmountBox,
  AmountInput,
  SubTotal,
  TotalBox,
  TotalText,
  TotalPrice,
  FinishButton,
  FinishButtonText,
} from './styles';

export default function Cart() {
  const cart = [
    {
      id: 1,
      title: 'Tênis de Caminhada Leve Confortável',
      price: 179.9,
      amount: 3,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
    },
    {
      id: 2,
      title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
      price: 139.9,
      amount: 2,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
    },
  ];

  return (
    <Container>
      <ItemContainer>
        {cart.map(item => (
          <ItemBox key={item.id}>
            <UpperInfo>
              <ItemImage source={{ uri: item.image }} />
              <TextBox>
                <ItemText>{item.title}</ItemText>
                <ItemPrice>{item.price}</ItemPrice>
              </TextBox>
              <Icon name="delete-forever" size={28} color="#7159c1" />
            </UpperInfo>
            <LowerInfo>
              <AmountBox>
                <Icon name="remove-circle-outline" size={23} color="#7159c1" />
                <AmountInput value={String(item.amount)} editable={false} />
                <Icon name="add-circle-outline" size={23} color="#7159c1" />
              </AmountBox>
              <SubTotal>{item.price * item.amount}</SubTotal>
            </LowerInfo>
          </ItemBox>
        ))}
        <TotalBox>
          <TotalText>TOTAL</TotalText>
          <TotalPrice>R$391390,21</TotalPrice>
          <FinishButton>
            <FinishButtonText>FINALIZAR PEDIDO</FinishButtonText>
          </FinishButton>
        </TotalBox>
      </ItemContainer>
    </Container>
  );
}
