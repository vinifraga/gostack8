import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as AuthActions from '~/store/modules/auth/actions';

import { Container } from './styles';
import logo from '~/assets/logo.svg';

export default function Header() {
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.profile.name);

  function handleLogout() {
    dispatch(AuthActions.signOut());
  }
  return (
    <Container>
      <nav>
        <Link to="/dashboard">
          <img src={logo} alt="MeetApp_Logo" />
        </Link>
        <aside>
          <div>
            <strong>{name}</strong>
            <Link to="/profile">Meu perfil</Link>
          </div>
          <button onClick={handleLogout} type="button">
            Sair
          </button>
        </aside>
      </nav>
    </Container>
  );
}
