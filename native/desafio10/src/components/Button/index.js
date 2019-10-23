import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({
  children,
  loading,
  small,
  disabled,
  ...rest
}) {
  return (
    <Container enabled={!disabled} small={small} {...rest}>
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
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  loading: false,
  small: false,
};
