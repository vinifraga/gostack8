import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { FaRegFrown, FaSpinner } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import * as MeetupActions from '~/store/modules/meetup/actions';
import history from '~/services/history';

import { Container } from './styles';

export default function Dashboard() {
  const meetups = useSelector(state => state.meetup.meetups);
  const loading = useSelector(state => state.meetup.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MeetupActions.indexRequest());
  }, [dispatch]);

  return (
    <Container loading={loading ? 1 : 0}>
      <div className="header">
        <h1>Meus meetups</h1>

        <button type="button" onClick={() => history.push('/new')}>
          <MdAddCircleOutline size={20} color="#FFF" />
          Novo meetup
        </button>
      </div>
      {loading ? (
        <div className="info">
          <FaSpinner size={40} color="rgba(255, 255, 255, 0.6)" />
          <span>Carregando...</span>
        </div>
      ) : meetups.length > 0 ? (
        <ul>
          {meetups.map(meetup => (
            <Link key={meetup.id} to={`edit/${meetup.id}`}>
              <li>
                <strong>{meetup.title}</strong>
                <aside>
                  <time dateTime={meetup.date}>
                    {format(parseISO(meetup.date), "d 'de' MMMM, 'às' H'h'", {
                      locale: pt,
                    })}
                  </time>
                  <MdChevronRight size={24} color="#FFF" />
                </aside>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <div className="info">
          <FaRegFrown size={40} color="rgba(255, 255, 255, 0.6)" />
          <span>Nenhum meetup criado.</span>
        </div>
      )}
    </Container>
  );
}
