import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { NavLink, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createSelector } from '@reduxjs/toolkit';

import { getOneChar } from '../../FetchApi/fetchChar';
import { AppDispatch } from '../../store/store';
import { Char, typeStore } from '../../types/types';
import { modalOpen } from '../../store/newSlice';

import pop from './popup.module.scss';

const Popup = () => {
  const selectorChar = createSelector(
    (state: typeStore) => state.rickAndMorti,
    (state) => state.char
  );
  const { id } = useParams();
  const TypeId = id as number & string;
  const dispatch = useDispatch<AppDispatch>();
  const char: Char = useSelector(selectorChar);
  const appRoot = document.getElementById('root') as HTMLElement;
  useEffect(() => {
    dispatch(getOneChar(TypeId));
  }, [dispatch, TypeId]);

  const { name, status, species, image, gender, type } = char;
  return ReactDOM.createPortal(
    <Card data-testid="popup" sx={{ minWidth: 275, position: 'absolute', top: '20px', right: '200px' }}>
      <IconButton sx={{ position: 'absolute', right: 0 }} onClick={() => dispatch(modalOpen(false))}>
        <NavLink data-testid="close-popup" to={'/'}>
          <CloseIcon />
        </NavLink>
      </IconButton>
      <h3 className={pop['name']}>{name}</h3>
      <ul className={pop['characteristics']}>
        <li>Status: {status}</li>
        <li>Species: {species}</li>
        <li>Gender: {gender}</li>
        <li>Type: {type ? type : 'No type'}</li>
      </ul>
      <img loading="lazy" src={image} alt="avatar" />
    </Card>,
    appRoot
  );
};

export default Popup;
