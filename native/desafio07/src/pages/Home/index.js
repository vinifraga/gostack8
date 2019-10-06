import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native';

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

export default class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');
    this.setState({ products: response.data });

    console.tron.log(response);
  }

  render() {
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
              <ItemPrice>{item.price}</ItemPrice>
              <AddProduct>
                <QuantityBox>
                  <Icon name="add-shopping-cart" size={19} color="#FFF" />
                  <QuantityText>1</QuantityText>
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
