import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CartActions from '../../store/modules/cart/actions';
import {
  Container,
  ItemBox,
  ItemImage,
  ItemTitle,
  ItemPrice,
  AddProduct,
  QuantityText,
  QuantityBox,
  AddButtonText,
} from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');
    const data = response.data.map(product => ({
      ...product,
      priceFormated: formatPrice(product.price),
    }));
    this.setState({ products: data });
  }

  handleAddProduct(id) {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  }

  render() {
    const { amount } = this.props;
    const { products } = this.state;

    return (
      <Container>
        <FlatList
          data={products}
          horizontal
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ItemBox key={String(item.id)}>
              <ItemImage source={{ uri: item.image }} />
              <ItemTitle>{item.title}</ItemTitle>
              <ItemPrice>{item.priceFormated}</ItemPrice>
              <AddProduct onPress={() => this.handleAddProduct(item.id)}>
                <QuantityBox>
                  <Icon name="add-shopping-cart" size={19} color="#FFF" />
                  <QuantityText>{amount[item.id] || 0}</QuantityText>
                </QuantityBox>
                <AddButtonText>ADICIONAR</AddButtonText>
              </AddProduct>
            </ItemBox>
          )}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
