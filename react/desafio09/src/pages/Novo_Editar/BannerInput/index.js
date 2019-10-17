import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { MdCameraAlt } from 'react-icons/md';

import api from '~/services/api';
import { Container } from './styles';

export default function BannerInput() {
  const { fieldName, registerField, defaultValue } = useField('banner');

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const [, option] = useLocation().pathname.split('/');
  const meetupId = useParams().id;
  const meetup = useSelector(state =>
    state.meetup.meetups.find(p => p.id === Number(meetupId))
  );

  const ref = useRef();

  useEffect(() => {
    registerField({
      name: 'banner_id',
      ref: ref.current,
      path: 'dataset.file',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); //eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('file', data);

    if (file) {
      if (option === 'edit') {
        if (meetup.banner.id !== file) {
          api.delete(`file/${file}`);
        }
      } else {
        api.delete(`file/${file}`);
      }
    }

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }
  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="Banner_preview" />
        ) : (
          <div>
            <MdCameraAlt size={54} color="rgba(255, 255, 255, 0.3)" />
            <strong>Selecionar imagem</strong>
          </div>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
