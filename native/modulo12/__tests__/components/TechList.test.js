import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import TechList from '~/components/TechList';

describe('TechList', () => {
  it('should be able to add new tech', () => {
    const { getByText, getByTestId } = render(<TechList />);

    fireEvent.changeText(getByTestId('tech-input'), 'Node.js');
    fireEvent.press(getByText('Adicionar'));

    expect(getByText('Node.js')).toBeTruthy();
    expect(getByTestId('tech-input')).toHaveProp('value', '');
  });
});
