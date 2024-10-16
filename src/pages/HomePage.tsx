import React, {useState} from 'react';
import Button from '@mui/material/Button';

import { Box, Container, Rating, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { auth } from '../firebase';
import { unauthorise } from '../state/auth/authSlice';
import Map from '../components /Map/map';

import axios from 'axios'
import { clearMap, getMinMaxLatLngLocations } from '../state/map/mapSlice';
const baseUrl = process.env.REACT_APP_BASE_URL;


function HomePage() {

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)
  const minMaxLatLng = useSelector((state: RootState) => state.map.minMaxlatLng)
  const res = useSelector((state: RootState) => state.map.response)



  const [mapLongLat, setMapLongLat] = useState<string>('none')



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
          <br/>
          <br/>
          <hr/>
          <br/>
          <Button variant='contained' onClick={async () => {
            try {
              let response = await axios.get(`${baseUrl}/search/?full_postcode=CA10%203EX`)
              let message = response.data;
              console.log(message)

              setMapLongLat(`lat: ${message[0].latitude}`)
              
            } catch (error) {
              console.log(error)
            }
        
          }}>CA10 3EX</Button>

          <br/>

          <p>Result:</p>
          <p>{mapLongLat}</p>


          <br/>
          <br/>
          <hr/>
          <br/>



          <Button variant='contained' onClick={async () => {

            dispatch(clearMap())
            dispatch(getMinMaxLatLngLocations(minMaxLatLng))
          
          }}>Search</Button>

          <br/>

          <p>Result:</p>
          <p>maxLat: {minMaxLatLng.maxLat}</p>
          <p>maxLng: {minMaxLatLng.maxLng}</p>
          <p>minLat: {minMaxLatLng.minLat}</p>
          <p>minLng: {minMaxLatLng.minLng}</p>
          <br/>
          <p>{res}</p>

        </Box>

        




        <Map/>
    </>
  )

}

export default HomePage;
