import { fireEvent, render, screen } from '@testing-library/react';

import App from '../App';
import Panel from '../components/filterPanel/panel';
import { getChar, getOneChar } from '../FetchApi/fetchChar';
import store from '../store/store';

describe('tests', () => {
  test('close and open popup', () => {
    jest.mock('react-redux', () => {
      render(<App />);
      const openPopup = screen.getByTestId('open-popup');
      expect(screen.queryByTestId('popup')).toBeNull();
      fireEvent.click(openPopup);
      expect(screen.getByTestId('popup')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('close-popup'));
      expect(screen.queryByTestId('popup')).toBeNull();
    });
  });
  test('test filterPanel(UI)', () => {
    jest.mock('react-redux', () => {
      render(<Panel />);
      const name = screen.getByTestId('filter-name');
      const status = screen.getByTestId('filter-status');
      const species = screen.getByTestId('filter-species');
      const type = screen.getByTestId('filter-type');
      const gender = screen.getByTestId('filter-gender');
      expect(name).toBeInTheDocument();
      expect(status).toBeInTheDocument();
      expect(species).toBeInTheDocument();
      expect(type).toBeInTheDocument();
      expect(gender).toBeInTheDocument();
    });
  });
  test('Проверка массива', () => {
    jest.mock('react-redux', () => {
      const state = store.getState().rickAndMorti.characters;
      expect(state.length > 0).toBe(true);
      expect(state.length).toHaveLength(20);
    });
  });
  test('Проверка getOneChar', () => {
    jest.mock('react-redux', async () => {
      const result = await store.dispatch(getOneChar(1));

      const char = result.payload;
      expect(char.name).toBe('Rick Sanchez');
      expect(result.type).toBe('cartoon/getOneChar/fulfilled');
    });
  });
  test('Проверка getChar', () => {
    jest.mock('react-redux', async () => {
      const result = await store.dispatch(getChar(1));
      const chars = result.payload;
      expect(chars).toBe([]);
      expect(result.type).toBe('cartoon/getOneChar/fulfilled');
    });
  });
});
