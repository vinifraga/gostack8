import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import * as MeetupActions from '~/store/modules/meetup/actions';
import history from '~/services/history';

import { Container } from './styles';

export default function Dashboard() {
  const meetups = useSelector(state => state.meetup.meetups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MeetupActions.indexRequest());
  }, [dispatch]);

  return (
    <Container>
      <div>
        <h1>Meus meetups</h1>

        <button type="button" onClick={() => history.push('/new')}>
          <MdAddCircleOutline size={20} color="#FFF" />
          Novo meetup
        </button>
      </div>
      <ul>
        {meetups.length > 0
          ? meetups.map(meetup => (
              <Link to={`edit/${meetup.id}`}>
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
            ))
          : 'Nenhum meetup'}
      </ul>
    </Container>
  );
}
