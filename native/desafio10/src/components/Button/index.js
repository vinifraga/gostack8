import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, loading, small, ...rest }) {
  return (
    <Container small={small} {...rest}>
      {loading ? (
        <ActivityIndicator size={20} color="#FFF" />
      ) : (
        <Text small={small}>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  small: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
  small: false,
};
