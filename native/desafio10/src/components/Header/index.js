import React from 'react';

import { Container, Logo } from './styles';
import headerLogo from '~/assets/HeaderLogo/HeaderLogo.png';

export default function Header() {
  return (
    <Container>
      <Logo source={headerLogo} />
    </Container>
  );
}
