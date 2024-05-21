import React, {useState} from 'react';
import Button from '@mui/material/Button';

import { Box, Container, Rating, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { auth } from '../firebase';
import { unauthorise } from '../state/auth/authSlice';
import Map from '../components /Map/map';

function HomePage() {

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <>
        <Box sx={{
          zIndex: 999,
          position: 'absolute',
          right: 10,
          top: '1vh',
          height: '95vh',
          width: 300,
          bgcolor: 'white',
          borderRadius: 2,
          padding: 1,
          boxShadow: '10px 10px 10px grey;'
        }}>

          <p>Uid: {user?.uid}</p>
          <Button variant='contained' onClick={async () => {
            await auth.signOut()
            dispatch(unauthorise())
          }}>Logout</Button>
        </Box>
        <Map/>
    </>
  )

}

export default HomePage;
