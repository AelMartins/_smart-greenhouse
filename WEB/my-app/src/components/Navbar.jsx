import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const Tudo = styled('div')({
  backgroundColor: '#F7CFCD',
  padding: '10px', // Adiciona um espaçamento interno
  '@media (max-width: 600px)': { // Adiciona um estilo para telas menores que 600px de largura
    padding: '5px',
  },
});

const Imagem = styled('div')({
  display: 'flex',
  margin: 'auto',
  height: '10vh', // Alterado para 10% da altura da viewport
  width: '80vw', // Alterado para 80% da largura da viewport
});

const Content = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const menuItems = [
  { title: 'Home', route: '/' },
  { title: 'Sobre', route: '/sobre' }, // Corrigido o título do menu
  { title: 'Contato', route: '/contato' }, // Corrigido o título do menu
];

const Navbar = () => {
  return (
    <Tudo>
      <Content>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Tabs centered>
              {menuItems.map((menu, index) => (
                <Tab
                  key={index}
                  label={menu.title}
                  component={Link}
                  to={menu.route}
                  sx={{ fontFamily: 'Rockwell' }}
                />
              ))}
            </Tabs>
            <Button variant="outlined" sx={{ marginLeft: 'auto', backgroundColor: '#F7CFCD' }}>
              <i className="mdi mdi-account-outline"></i>LOGIN / CADASTRO
            </Button>
          </Toolbar>
        </AppBar>
      </Content>
    </Tudo>
  );
};

export default Navbar;
