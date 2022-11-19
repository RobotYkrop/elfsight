import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OutlinedInput } from '@mui/material';

import { getFilterChar } from '../../FetchApi/fetchChar';
import { AppDispatch } from '../../store/store';

import pan from './panel.module.scss';

const Panel = () => {
  const [text, setText] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { GenderArr, StatusArr } = useSelector((state: any) => state.rickAndMorti);

  useEffect(() => {
    console.log(dispatch(getFilterChar({ text, status, species, type, gender })));
  }, [dispatch, text, status, species, type, gender]);

  return (
    <div>
      <label className={pan['groupFilter']}>
        <OutlinedInput placeholder={'name'} type={'text'} onChange={(e) => setText(e.target.value)} />
        <Autocomplete
          id="size-small-standard-multi"
          size="small"
          options={StatusArr}
          getOptionLabel={(option: string): string => option}
          onChange={(e) => setStatus((e.target as HTMLElement).textContent!)}
          renderInput={(params) => <TextField {...params} variant="standard" label="Status" />}
        />
        <OutlinedInput type={'text'} placeholder={'species'} onChange={(e) => setSpecies(e.target.value)} />
        <OutlinedInput type={'text'} placeholder={'type'} onChange={(e) => setType(e.target.value)} />
        <Autocomplete
          id="size-small-standard-multi"
          size="small"
          options={GenderArr}
          getOptionLabel={(option: string): string => option}
          onChange={(e) => setGender((e.target as HTMLElement).textContent!)}
          renderInput={(params) => <TextField {...params} variant="standard" label="Gender" />}
        />
      </label>
    </div>
  );
};

export default Panel;
