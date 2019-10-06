import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

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
  return (
    <Container>
      <LogoBox onPress={() => navigation.navigate('Home')}>
        <LogoImage source={logo} />
      </LogoBox>
      <Cart onPress={() => navigation.navigate('Cart')}>
        <Icon name="basket" size={24} color="#FFF" />
        <QuantityBox>
          <QuantityText>3</QuantityText>
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
