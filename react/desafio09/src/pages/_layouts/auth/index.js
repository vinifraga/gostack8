import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Container, Content } from './styles';

export default function AuthLayout({ children }) {
  const loading = useSelector(state => state.auth.loading);
  return (
    <Container>
      <Content loading={loading ? 1 : 0}>{children}</Content>
    </Container>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
