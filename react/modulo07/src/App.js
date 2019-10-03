import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import GlobalStyles from './styles/global';

// import { Container } from './styles';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      {/* <Header /> */}
      <Routes />
    </BrowserRouter>
  );
}
