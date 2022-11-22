import { createAsyncThunk } from '@reduxjs/toolkit';

import { Char, getChars } from '../types/types';

const URL = 'https://rickandmortyapi.com/api/character/';

export const getChar = createAsyncThunk<getChars, number>('cartoon/getChar', async (curPage, { rejectWithValue }) => {
  const res = await fetch(URL + `?page=${curPage}`);
  try {
    if (!res.ok) {
      throw new Error('Не найден API' + `${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return rejectWithValue(err);
  }
});
export const getFilterChar = createAsyncThunk<getChars, Char>(
  'cartoon/getFilterChar',
  async ({ text, status, species, type, gender }, { rejectWithValue }) => {
    const res = await fetch(URL + `?name=${text}&status=${status}&species=${species}&type=${type}&gender=${gender}`);
    try {
      if (res.status === 404) {
        throw new Error('Заданный параметр не найден');
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getOneChar = createAsyncThunk('cartoon/getOneChar', async (id: number, { rejectWithValue }) => {
  const res = await fetch(URL + id);
  try {
    if (!res.ok) {
      throw new Error('Не найден API' + `${res.status}`);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    return rejectWithValue(err);
  }
});
