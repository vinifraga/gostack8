import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import {
  MdModeEdit,
  MdDeleteForever,
  MdToday,
  MdLocationOn,
} from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import * as MeetupActions from '~/store/modules/meetup/actions';
import history from '~/services/history';
import { Container, InfoHeader, Info, Description } from './styles';

export default function Detalhes() {
  const { id } = useParams();
  const meetup = useSelector(state =>
    state.meetup.meetups.find(p => p.id === Number(id))
  );
  const loading = useSelector(state => state.meetup.loading);
  const dispatch = useDispatch();
  const { id: bannerId } = meetup.banner;
  const { url } = meetup.banner;

  function handleDelete() {
    dispatch(MeetupActions.deleteRequest(id, bannerId));
  }

  return (
    <Container loading={loading ? 1 : 0}>
      <InfoHeader>
        <h1>{meetup.title}</h1>

        <aside>
          <button
            className="edit"
            disabled={loading ? 1 : 0}
            type="button"
            onClick={() => history.push(`/edit/${id}`)}
          >
            <MdModeEdit size={20} color="#FFF" />
            Editar
          </button>
          {loading ? (
            <button disabled className="delete" type="button">
              <FaSpinner className="loading" size={20} color="#FFF" />
              Aguarde
            </button>
          ) : (
            <button className="delete" type="button" onClick={handleDelete}>
              <MdDeleteForever size={20} color="#FFF" />
              Cancelar
            </button>
          )}
        </aside>
      </InfoHeader>

      <Info>
        <img src={url} alt="Meetup_Banner" />
        <Description>{meetup.description}</Description>
        <div>
          <time>
            <MdToday size={20} color="rgba(255, 255, 255, 0.6)" />
            {format(parseISO(meetup.date), "d 'de' MMMM 'de' yyyy, 'às' H'h'", {
              locale: pt,
            })}
          </time>
          <address>
            <MdLocationOn size={20} color="rgba(255, 255, 255, 0.6)" />
            {meetup.location}
          </address>
        </div>
      </Info>
    </Container>
  );
}
