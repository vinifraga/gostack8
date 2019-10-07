import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import {
  Body,
  Container,
  Scroll,
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
  EmptyCart,
  EmptyCartText,
} from './styles';

export default function Cart() {
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subTotal: formatPrice(product.price * product.amount),
    }))
  );
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.price * product.amount;
      }, 0)
    )
  );
  const dispatch = useDispatch();

  function handleRemove(id) {
    dispatch(CartActions.removeFromCart(id));
  }

  function handleUpdateAmount(id, amount) {
    dispatch(CartActions.updateAmountRequest(id, amount));
  }

  function handleFinish() {
    Alert.alert('', 'Deseja finalizar o pedido?', [
      { text: 'NÃO', style: 'cancel' },
      {
        text: 'SIM',
        onPress: () => {
          Alert.alert('', 'Pedido finalizado', [{ text: 'OK' }]);
        },
      },
    ]);
  }

  return (
    <Body>
      <Container>
        {cart.length > 0 ? (
          <Scroll>
            {cart.map(item => (
              <ItemBox key={item.id}>
                <UpperInfo>
                  <ItemImage source={{ uri: item.image }} />
                  <TextBox>
                    <ItemText>{item.title}</ItemText>
                    <ItemPrice>{item.priceFormated}</ItemPrice>
                  </TextBox>
                  <Icon
                    name="delete-forever"
                    onPress={() => handleRemove(item.id)}
                    size={28}
                    color="#7159c1"
                  />
                </UpperInfo>
                <LowerInfo>
                  <AmountBox>
                    <Icon
                      name="remove-circle-outline"
                      onPress={() =>
                        handleUpdateAmount(item.id, item.amount - 1)
                      }
                      size={23}
                      color="#7159c1"
                    />
                    <AmountInput value={String(item.amount)} editable={false} />
                    <Icon
                      name="add-circle-outline"
                      onPress={() =>
                        handleUpdateAmount(item.id, item.amount + 1)
                      }
                      size={23}
                      color="#7159c1"
                    />
                  </AmountBox>
                  <SubTotal>{item.subTotal}</SubTotal>
                </LowerInfo>
              </ItemBox>
            ))}
            <TotalBox>
              <TotalText>TOTAL</TotalText>
              <TotalPrice>{total}</TotalPrice>
              <FinishButton onPress={handleFinish}>
                <FinishButtonText>FINALIZAR PEDIDO</FinishButtonText>
              </FinishButton>
            </TotalBox>
          </Scroll>
        ) : (
          <EmptyCart>
            <Icon
              name="remove-shopping-cart"
              size={60}
              color="rgba(113,89,193, 0.5)"
            />
            <EmptyCartText>Seu carrinho está vazio</EmptyCartText>
          </EmptyCart>
        )}
      </Container>
    </Body>
  );
}
