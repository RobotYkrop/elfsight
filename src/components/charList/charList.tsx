/* eslint-disable react/display-name */
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from 'react-router-dom';

import { getChar } from '../../FetchApi/fetchChar';
import { AppDispatch } from '../../store/store';
import { Char } from '../../types/types';
import { modalOpen } from '../../store/newSlice';

import char from './charList.module.scss';

const CharList = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const [offset, setOffset] = useState(0);

  const { characters, error, isLoading, pages } = useSelector((state: any) => state.rickAndMorti);
  console.log(error);
  useEffect(() => {
    console.log(dispatch(getChar(offset)));
  }, [dispatch, offset, setOffset]);
  return (
    <div>
      {(error && <Alert severity="error">{error?.message}</Alert>) ??
        (!isLoading ? (
          <div>
            <ul className={char['charList']}>
              {characters.map((data: Char) => (
                <li onClick={() => dispatch(modalOpen(true))} key={data.id}>
                  <NavLink to={`/character/${data.id}`}>{data.name}</NavLink>
                </li>
              ))}
            </ul>
            <Pagination count={pages} variant="outlined" onChange={(_, num) => setOffset(num)} />
          </div>
        ) : (
          <CircularProgress />
        ))}
    </div>
  );
});

export default CharList;
