import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OutlinedInput } from '@mui/material';

import { typeStore } from '../../types/types';
import { getFilterChar } from '../../FetchApi/fetchChar';
import { AppDispatch } from '../../store/store';
import { setGender, setSpecies, setStatus, setText, setType } from '../../store/newSlice';

import pan from './panel.module.scss';

const Panel = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { GenderArr, StatusArr, filters } = useSelector((state: typeStore) => state.rickAndMorti);

  const { text, species, status, type, gender } = filters;

  useEffect(() => {
    dispatch(getFilterChar({ text, status, species, type, gender }));
  }, [dispatch, text, status, species, type, gender]);

  return (
    <label className={pan['groupFilter']}>
      <OutlinedInput
        data-testid="filter-name"
        placeholder={'name'}
        onChange={(e) => dispatch(setText(e.target.value))}
      />
      <Autocomplete
        data-testid="filter-status"
        size="small"
        options={StatusArr}
        getOptionLabel={(option: string): string => option}
        onChange={(e) => dispatch(setStatus((e.target as HTMLElement).textContent!))}
        renderInput={(params) => <TextField {...params} label="Status" />}
      />
      <OutlinedInput
        data-testid="filter-species"
        placeholder={'species'}
        onChange={(e) => dispatch(setSpecies(e.target.value))}
      />
      <OutlinedInput
        data-testid="filter-type"
        placeholder={'type'}
        onChange={(e) => dispatch(setType(e.target.value))}
      />
      <Autocomplete
        data-testid="filter-gender"
        size="small"
        options={GenderArr}
        getOptionLabel={(option: string): string => option}
        onChange={(e) => dispatch(setGender((e.target as HTMLElement).textContent!))}
        renderInput={(params) => <TextField {...params} label="Gender" />}
      />
    </label>
  );
};

export default Panel;
