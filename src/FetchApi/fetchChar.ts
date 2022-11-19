import { createAsyncThunk } from '@reduxjs/toolkit';

import { Char, getChars } from '../types/types';

export const getChar = createAsyncThunk<getChars, number>('cartoon/getChar', async (curPage, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${curPage}`);
    if (!res.ok) {
      throw new Error('Не найден API' + `${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getFilterChar = createAsyncThunk<any, Char>(
  'cartoon/getChar',
  async ({ text, status, species, type, gender }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${text}&status=${status}&species=${species}&type=${type}&gender=${gender}`
      );
      if (!res.ok) {
        throw new Error('Не найден API' + `${res.status}`);
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getOneChar = createAsyncThunk('blog/getOneChar', async (id: number, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) {
      throw new Error('Не найден API' + `${res.status}`);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    return rejectWithValue(err);
  }
});
