

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { authorise } from '../../state/auth/authSlice';
import { Alert } from '@mui/material';

const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>()
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = `${data.get('email')}`;
    const password  = `${data.get('password')}`;

    try {
        let credenctial = await signInWithEmailAndPassword(auth, email, password);
        dispatch(authorise({uid: credenctial.user.uid}))
        navigate('/');
        
      } catch(error: any) { 
          if (error.code.includes('auth/weak-password')) {
              setError('Please enter a stronger password');
          } else if (error.code.includes('auth/email-already-in-use')) {
              setError('This email is already in use')
          } else if (error.code.includes('auth/wrong-password')) {
              setError('wrong password')
          } else if (error.code.includes('auth/user-not-found')) {
              setError('Sorry we do not recognise this email')
          } else  {
            console.log(error)
            setError(error.message)
          }
      }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error !== '' ? <Alert severity="error" style={{width: '100%', marginTop: 20}}>{error}</Alert> : null}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign_up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}