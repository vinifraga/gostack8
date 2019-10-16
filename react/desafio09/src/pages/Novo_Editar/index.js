import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Container } from './styles';
import DateInput from './DateInput';
import BannerInput from './BannerInput';
import history from '~/services/history';
import * as MeetupActions from '~/store/modules/meetup/actions';

export default function Novo_Editar() {
  const params = useParams();
  const loading = useSelector(state => state.meetup.loading);
  const meetups = useSelector(state => state.meetup.meetups);
  const location = useLocation();
  const INITIAL_DATA =
    meetups.find(searchMeetup => searchMeetup.id === Number(params.id)) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    const [, option] = location.pathname.split('/');
    if (option === 'new') return;
    if (!params || !params.id || meetups.length === 0) {
      toast.error('Falha na edição');
      history.push('/dashboard');
    }
  }, [location.pathname, meetups.length, params]);

  function handleSubmit(data) {
    const [, option] = location.pathname.split('/');
    if (option === 'new') {
      dispatch(MeetupActions.storeRequest(data));
    } else {
      dispatch(MeetupActions.updateRequest(params.id, data));
    }
  }
  return (
    <Container loading={loading ? 1 : 0}>
      <Form initialData={INITIAL_DATA} onSubmit={handleSubmit}>
        <BannerInput name="banner_id" />
        <Input name="title" type="text" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          type="text"
          placeholder="Descrição completa"
        />
        <DateInput name="date" />
        <Input name="location" type="text" placeholder="Localização" />
        <div className="button">
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <FaSpinner size={20} color="#FFF" />
                Salvando...
              </>
            ) : (
              <>
                <MdAddCircleOutline size={20} color="#FFF" />
                Salvar meetup
              </>
            )}
          </button>
        </div>
      </Form>
    </Container>
  );
}
