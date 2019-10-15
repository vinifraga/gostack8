import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';
import DateInput from './DateInput';
import BannerInput from './BannerInput';

const loading = false;

export default function Novo_Editar() {
  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <BannerInput name="banner" />
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
                Salvar perfil
              </>
            )}
          </button>
        </div>
      </Form>
    </Container>
  );
}
