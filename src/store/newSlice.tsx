import { createSlice } from '@reduxjs/toolkit';

import { getChar, getFilterChar, getOneChar } from '../FetchApi/fetchChar';
import { initState } from '../types/types';

const initialState: initState = {
  characters: [],
  char: {},
  error: null,
  isLoading: true,
  pages: 0,
  isOpen: true,
  StatusArr: ['dead', 'alive', 'unknown'],
  GenderArr: ['female', 'male', 'genderless', 'unknown'],
  filters: {
    text: '',
    status: '',
    species: '',
    type: '',
    gender: '',
  },
};

const rickAndMorti = createSlice({
  name: 'cartoon',
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setText: (state, action) => {
      state.filters.text = action.payload;
    },
    setStatus: (state, action) => {
      state.filters.status = action.payload;
    },
    setSpecies: (state, action) => {
      state.filters.species = action.payload;
    },
    setType: (state, action) => {
      state.filters.type = action.payload;
    },
    setGender: (state, action) => {
      state.filters.gender = action.payload;
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  extraReducers(builder) {
    builder.addCase(getChar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChar.fulfilled, (state, action) => {
      state.characters = action.payload.results;
      state.pages = action.payload?.info?.pages;
      state.isLoading = false;
    });
    builder.addCase(getChar.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    // --------------------------------------------------------
    builder.addCase(getOneChar.fulfilled, (state, action) => {
      state.char = action.payload;
    });
    // --------------------------------------------------------
    builder.addCase(getFilterChar.fulfilled, (state, action) => {
      state.characters = action.payload.results;
      state.pages = action.payload?.info?.pages;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(getFilterChar.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});
export const { modalOpen, setGender, setSpecies, setStatus, setText, setType } = rickAndMorti.actions;

export default rickAndMorti.reducer;
