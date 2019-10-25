/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { Container } from './styles';

export default function TechList() {
  const [newTech, setNewTech] = useState('');

  const techs = useSelector(state => state.techs);
  const dispatch = useDispatch();

  function handleAddTech() {
    dispatch({ type: 'ADD_TECH', payload: { tech: newTech } });
    setNewTech('');
  }

  return (
    <form data-testid="tech-form" onSubmit={handleAddTech}>
      <ul data-testid="tech-list">
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <label htmlFor="tech">Tech</label>
      <input
        type="text"
        value={newTech}
        id="tech"
        onChange={e => setNewTech(e.target.value)}
      />

      <button type="button" onClick={handleAddTech}>
        Adicionar
      </button>
    </form>
  );
}
