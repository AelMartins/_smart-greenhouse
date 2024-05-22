import React from 'react';
import Home from './src/pages/Home.jsx'
import SignIn from './src/pages/SignIn.jsx'
import SignUp from './src/pages/SignUp.jsx'
import DataPlant from './src/pages/DataPlant.jsx'
import Statistics from './src/pages/Statistics.jsx'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
const newScreen = (name, component, options) => {
  return <Stack.Screen name={name} component={component} options={options} />
}

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {newScreen('SignIn', SignIn, { headerShown: false })}
        {newScreen('SignUp', SignUp, { title: 'Cadastro', headerTitleStyle: { fontWeight: 'bold', color: '#2D9831' } })}
        {newScreen('Home', Home, { title: 'Suas Plantinhas', headerTitleStyle: { fontWeight: 'bold', color: '#2D9831' } })}
        {newScreen('DataPlant', DataPlant, { title: 'Dados da Planta', headerTitleStyle: { fontWeight: 'bold', color: '#2D9831' } })}
        {newScreen('Statistics', Statistics, { title: 'Estatísticas', headerTitleStyle: { fontWeight: 'bold', color: '#2D9831' } })}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
