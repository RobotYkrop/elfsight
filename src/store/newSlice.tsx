import { createSlice } from '@reduxjs/toolkit';

import { getChar, getOneChar } from '../FetchApi/fetchChar';
import { initState } from '../types/types';

const initialState: initState = {
  characters: [],
  char: {},
  isError: false,
  isLoading: true,
  pages: 0,
  StatusArr: ['dead', 'alive', 'unknown'],
  GenderArr: ['female', 'male', 'genderless', 'unknown'],
};

const rickAndMorti = createSlice({
  name: 'cartoon',
  initialState,
  reducers: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  extraReducers(builder) {
    builder.addCase(getChar.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(getChar.fulfilled, (state, action) => {
      state.characters = action.payload.results;
      state.pages = action.payload?.info?.pages;
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(getChar.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(getOneChar.fulfilled, (state, action) => {
      state.char = action.payload;
      state.isError = false;
      state.isLoading = false;
    });
  },
});

export default rickAndMorti.reducer;
