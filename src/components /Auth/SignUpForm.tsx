
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { authorise } from "../../state/auth/authSlice"
import { useState } from 'react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


interface FirebaseError {
    code: string
    message: string
}

// import { Link } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUpForm() {
    
    const dispatch = useDispatch<AppDispatch>()
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = `${data.get('email')}`;
        const password  = `${data.get('password')}`;

        try {
            let credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user.uid)
            console.log(credentials.user.email)
            dispatch(authorise({
                uid: credentials.user.uid,
            }))
            navigate('/')
        } catch(error: any) { 
            console.log(error);
            if (error.code.includes('auth/weak-password')) {
                setError('Please enter a stronger password');
            } else if (error.code.includes('auth/email-already-in-use')) {
                setError('This email is already in use')
            } else if(error.code.includes('auth/internal-error')) {
                setError('Sorry something went wrong, please try again later')
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
            Sign up
          </Typography>
          {error !== '' ? <Alert severity="error" style={{width: '100%', marginTop: 20}}>{error}</Alert> : null}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link to='/sign_in'>Already have an account? Sign in</Link> */}
                <Link href="/sign_in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}