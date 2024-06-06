import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/SignIn');
    };
    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem', backgroundColor: '#f0f0f0', padding: '2rem', borderRadius: '10px' }}>
            <Typography variant="h4" component="h1" gutterBottom style={{ color: '#2E7D32', marginBottom: '1rem' }}>
                Bem-vindo ao nosso aplicativo de monitoramento de plantas!
            </Typography>
            <Typography variant="body1" style={{ color: '#333', marginBottom: '2rem' }}>
                Aqui você pode acompanhar o crescimento das suas plantas e verificar estatísticas importantes.
            </Typography>
            <Button onClick={handleLogin} variant="contained" style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
                Começar
            </Button>
        </Container>
    );
};

export default Home;
