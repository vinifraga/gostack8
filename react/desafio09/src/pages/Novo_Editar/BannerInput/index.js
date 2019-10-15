import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';
import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('banner');

  const [preview, setPreview] = useState(defaultValue);
  const [file, setFile] = useState(defaultValue);

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
  }, [ref.current]); //eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('file', data);

    const { id, url } = response.data;
    console.tron.log(response.data, data);
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
