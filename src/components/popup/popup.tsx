import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { getOneChar } from '../../FetchApi/fetchChar';
import { AppDispatch } from '../../store/store';
import { Char, typeStore } from '../../types/types';
import { modalOpen } from '../../store/newSlice';

const Popup = () => {
  const { id } = useParams();
  const TypeId = id as number & string;
  const dispatch = useDispatch<AppDispatch>();
  const char: Char = useSelector((state: typeStore) => state.rickAndMorti.char);
  useEffect(() => {
    console.log(dispatch(getOneChar(TypeId)));
  }, [dispatch, TypeId]);
  const appRoot = document.getElementById('root') as HTMLElement;
  console.log(char);

  const { name, status, species, image, gender, type } = char;
  return ReactDOM.createPortal(
    <Card sx={{ minWidth: 275, position: 'absolute', top: 0, right: '950px' }}>
      <IconButton sx={{ position: 'absolute', right: 0 }} onClick={() => dispatch(modalOpen(false))}>
        <CloseIcon />
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
        <CardMedia component="img" height="140" image={image} />
      </CardContent>
    </Card>,
    appRoot
  );
};

export default React.memo(Popup);
