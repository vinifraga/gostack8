import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Container,
  LogoBox,
  LogoImage,
  Cart,
  QuantityBox,
  QuantityText,
} from './styles';
import logo from '../../assets/images/logo.png';

function Header({ navigation, cartSize }) {
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

const mapStateToProps = state => ({
  cartSize: state.cart.length,
});

export default connect(mapStateToProps)(Header);
