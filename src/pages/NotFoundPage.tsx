import { Button, Container, Typography } from '@mui/material'
import {  useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <Container
        maxWidth="lg"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <Typography variant="h1" >404 Not Found</Typography>
        <Button variant="contained" onClick={() => {navigate('/')}}>Back to Home</Button>
        </Container>
    )
}
