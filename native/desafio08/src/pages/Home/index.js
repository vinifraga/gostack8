import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

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

export default function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const amount = useSelector(state =>
    state.cart.reduce((amountAux, product) => {
      amountAux[product.id] = product.amount;

      return amountAux;
    }, {})
  );

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');
      const data = response.data.map(product => ({
        ...product,
        priceFormated: formatPrice(product.price),
      }));
      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

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
            <AddProduct onPress={() => handleAddProduct(item.id)}>
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
