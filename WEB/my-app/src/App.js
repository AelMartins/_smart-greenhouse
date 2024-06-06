// App.js
import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import DataPlant from './components/DataPlant';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomeUser from './components/HomeUser';
import infoPlanta from './components/InfoPlanta';
import { UserProvider } from './userContext';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataPlant" element={<DataPlant />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/homeUser" element={<HomeUser />} />
        <Route path="/infoPlanta" element={<infoPlanta />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
