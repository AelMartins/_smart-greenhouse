import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/background.jpg';
import '../utils/api';

const api = require('../utils/api');

const ImageBackground = styled('div')({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '20px', 
});

const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '20px',
  borderRadius: '10px',
  width: '100%',
  maxWidth: '500px', // max width for larger screens
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  width: '100%',
  '& input': {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '10px',
  },
}));

const CustomButton = styled(Button)(({ type, theme }) => ({
  margin: '10px 0',
  borderColor: '#78d600',
  backgroundColor: type === 'signin' ? 'rgba(255,255,255,0.9)' : '#78d600',
  color: type === 'signin' ? '#78d600' : '#fff',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    margin: '5px 0',
  },
}));

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [messageRequest, setMessageRequest] = useState(null);
  const [password, setPassword] = useState('');

  const defineMessage = (message, set, time = 2500) => {
    set(message);
    setTimeout(() => set(''), time);
    console.log(JSON.stringify(message));
  };

  const handleSignIn = async () => {
    if (!email || !password) {
        defineMessage({ error: true, msg: 'Preencha os campos corretamente' }, setMessageRequest);
        return;
    }

    setMessageRequest({ msg: 'Carregando...' });

    await api.post(`/users/login`, { email, password })
        .then(async res => {
            console.log('resposta', res);
            defineMessage({ msg: `Login realizado com sucesso` }, setMessageRequest, 1500);
            
            // Adiciona dados do usuário a sessão
            sessionStorage.setItem('user', JSON.stringify(res));
            
            // Dispara evento de storage manualmente
            window.dispatchEvent(new Event('storage'));

            navigate('/HomeUser');
            setEmail('');
            setPassword('');

        })
        .catch(err => defineMessage({ error: true, msg: err?.response?.data?.message || 'Erro ao realizar Login' }, setMessageRequest));
  };

  const handleSignUp = () => {
    navigate('/signUp');
  };

  return (
    <ImageBackground>
      <CustomContainer>
        <Typography variant="h5" color="#78d600" sx={{ textShadow: '2px 2px 4px black' }}>
          E-mail
        </Typography>
        <CustomTextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          fullWidth
          variant="outlined"
          error={messageRequest?.error}
        />
        <Typography variant="h5" color="#78d600" sx={{ textShadow: '2px 2px 4px black' }}>
          Senha
        </Typography>
        <CustomTextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
          fullWidth
          variant="outlined"
          error={messageRequest?.error}
        />
        {messageRequest?.msg && (
          <Typography variant="body2" color={messageRequest.error ? 'error' : '#78d600'}>
            {messageRequest.msg}
          </Typography>
        )}
        <Card sx={{ marginTop: '20px', width: '100%' }}>
          <CardContent>
            <CustomButton type="signin" variant="outlined" fullWidth onClick={handleSignIn}>
              Entrar
            </CustomButton>
            <CustomButton variant="contained" fullWidth onClick={handleSignUp}>
              Inscreva-se
            </CustomButton>
          </CardContent>
        </Card>
      </CustomContainer>
    </ImageBackground>
  );
};

export default SignIn;
