import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink, Outlet } from 'react-router-dom';

import { getChar } from '../../FetchApi/fetchChar';
import { AppDispatch } from '../../store/store';
import { Char } from '../../types/types';

import char from './charList.module.scss';

const CharList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [offset, setOffset] = useState(0);
  const [pop, setPop] = useState(false);

  const { characters, isError, isLoading, pages } = useSelector((state: any) => state.rickAndMorti);
  useEffect(() => {
    console.log(dispatch(getChar(offset)));
  }, [dispatch, offset]);
  return (
    <div>
      {isError && <Alert severity="error">Произошла ошибка при загрузке данных!</Alert>}
      {pop && <Outlet context={[setPop]} />}
      {!isLoading ? (
        <div>
          <ul className={char['charList']}>
            {characters.map((data: Char) => (
              <li onClick={() => setPop(true)} key={data.id}>
                <NavLink to={`/character/${data.id}`}>{data.name}</NavLink>
              </li>
            ))}
          </ul>
          <Pagination
            count={pages}
            variant="outlined"
            onChange={(_, num) => {
              setOffset(num);
            }}
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default CharList;
