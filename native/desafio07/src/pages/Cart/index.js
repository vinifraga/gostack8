import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  function handleRemove(id) {
    removeFromCart(id);
  }

  function handleUpdateAmount(id, amount) {
    updateAmountRequest(id, amount);
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

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  total: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
