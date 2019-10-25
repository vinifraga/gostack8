import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import TechList from '~/components/TechList';

jest.mock('react-redux');

describe('TechList component', () => {
  it('should render tech list', () => {
    useSelector.mockImplementation(cb =>
      cb({
        techs: ['Node.js', 'ReactJS'],
      })
    );

    const { getByText, getByTestId, debug } = render(<TechList />);

    debug();

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });
});
