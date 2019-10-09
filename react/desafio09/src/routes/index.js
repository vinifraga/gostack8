import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Detalhes from '~/pages/Detalhes';
import Novo_Editar from '~/pages/Novo_Editar';
import Profile from '~/pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" isPrivate component={Dashboard} />
      <Route path="/details" isPrivate component={Detalhes} />
      <Route path="/new-edit" isPrivate component={Novo_Editar} />
      <Route path="/profile" isPrivate component={Profile} />
    </Switch>
  );
}
