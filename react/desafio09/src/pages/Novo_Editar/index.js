import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container } from './styles';
import DateInput from './DateInput';
import BannerInput from './BannerInput';
import history from '~/services/history';
import * as MeetupActions from '~/store/modules/meetup/actions';

export default function Novo_Editar() {
  const params = useParams();
  const loading = useSelector(state => state.meetup.loading);
  const meetups = useSelector(state => state.meetup.meetups);
  const [, option] = useLocation().pathname.split('/');
  const INITIAL_DATA =
    meetups.find(searchMeetup => searchMeetup.id === Number(params.id)) || {};
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
    title: Yup.string().required('O título é obrigatório'),
    location: Yup.string().required('A localização é obrigatória'),
    description: Yup.string().required('A descrição é obrigatória'),
    date: Yup.date().required('A data é obrigatória'),
    banner_id: Yup.number().required('O banner é obrigatório'),
  });

  useEffect(() => {
    if (option === 'new') return;
    if (!params || !params.id || meetups.length === 0) {
      toast.error('Falha na edição');
      history.push('/dashboard');
    }
  }, [meetups.length, option, params]);

  function handleSubmit(data) {
    if (option === 'new') {
      dispatch(MeetupActions.storeRequest(data));
    } else {
      dispatch(MeetupActions.updateRequest(params.id, data));
    }
  }
  return (
    <Container loading={loading ? 1 : 0}>
      <Form schema={schema} initialData={INITIAL_DATA} onSubmit={handleSubmit}>
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
