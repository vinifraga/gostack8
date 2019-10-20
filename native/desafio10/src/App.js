import React from 'react';

import createRoutes from './routes';

export default function App() {
  const Routes = createRoutes(false);

  return <Routes />;
}
