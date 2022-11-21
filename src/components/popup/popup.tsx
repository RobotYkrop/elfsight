import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { NavLink, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createSelector } from '@reduxjs/toolkit';

import { getOneChar } from '../../FetchApi/fetchChar';
import { AppDispatch } from '../../store/store';
import { Char, typeStore } from '../../types/types';
import { modalOpen } from '../../store/newSlice';

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
  console.log(char);

  const { name, status, species, image, gender, type } = char;
  return ReactDOM.createPortal(
    <Card data-testid="popup" sx={{ minWidth: 275, position: 'absolute', top: '20px', right: '200px' }}>
      <IconButton sx={{ position: 'absolute', right: 0 }} onClick={() => dispatch(modalOpen(false))}>
        <NavLink data-testid="close-popup" to={'/'}>
          <CloseIcon />
        </NavLink>
      </IconButton>
      <CardContent>
        <Typography variant="h3" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {status}
        </Typography>
        <Typography variant="body2">{species}</Typography>
        <Typography variant="body2">{gender}</Typography>
        <Typography variant="body2">{type}</Typography>
        <CardMedia component="img" height="300" image={image} />
      </CardContent>
    </Card>,
    appRoot
  );
};

export default Popup;
