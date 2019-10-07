import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
  Container,
  LogoBox,
  LogoImage,
  Cart,
  QuantityBox,
  QuantityText,
} from './styles';
import logo from '../../assets/images/logo.png';

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);
  return (
    <Container>
      <LogoBox onPress={() => navigation.navigate('Home')}>
        <LogoImage source={logo} />
      </LogoBox>
      <Cart onPress={() => navigation.navigate('Cart')}>
        <Icon name="basket" size={24} color="#FFF" />
        <QuantityBox>
          <QuantityText>{cartSize}</QuantityText>
        </QuantityBox>
      </Cart>
    </Container>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
