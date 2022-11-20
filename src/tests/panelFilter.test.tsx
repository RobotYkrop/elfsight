import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import App from '../App';
import CharList from '../components/charList/charList';
import Panel from '../components/filterPanel/panel';

describe('UX', () => {
  jest.mock('react-redux', () => {
    test('close and open popup', () => {
      render(<App />);
      const openPopup = screen.getByTestId('open-popup');
      const closePopup = screen.getByTestId('close-popup');
      userEvent.click(openPopup);
      expect(screen.getByTestId('popup')).toBeInTheDocument();
      userEvent.click(closePopup);
    });
    test('test filterPanel', () => {
      render(<Panel />);
      const name = screen.getByTestId('filter-name');
      const status = screen.getByTestId('filter-status');
      const species = screen.getByTestId('filter-species');
      const type = screen.getByTestId('filter-type');
      const gender = screen.getByTestId('filter-gender');
    });
    test('test filterPanel', () => {});
  });
});
