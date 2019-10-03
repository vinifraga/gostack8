import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

// import { Container } from './styles';

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes />
    </BrowserRouter>
  );
}
