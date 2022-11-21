import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';

import { getChar } from '../../FetchApi/fetchChar';
import { AppDispatch } from '../../store/store';
import { Char, typeStore } from '../../types/types';
import { modalOpen } from '../../store/newSlice';

import char from './charList.module.scss';

const CharList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [offset, setOffset] = useState(1);

  const selectorChars = createSelector(
    (state: typeStore) => state.rickAndMorti,
    (state) => state.characters
  );

  const error = useSelector((state: typeStore) => state.rickAndMorti.error, shallowEqual);
  const isLoading = useSelector((state: typeStore) => state.rickAndMorti.isLoading, shallowEqual);
  const pages = useSelector((state: typeStore) => state.rickAndMorti.pages, shallowEqual);
  const characters = useSelector(selectorChars, shallowEqual);
  console.log(characters);
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
                  <NavLink data-testid="open-popup" to={`/character/${data.id}`}>
                    {data.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Pagination page={offset} count={pages} variant="outlined" onChange={(_, num) => setOffset(num)} />
          </div>
        ) : (
          <CircularProgress />
        ))}
    </div>
  );
};

export default CharList;
