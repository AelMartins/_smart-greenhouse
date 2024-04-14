import React from 'react';
// import { SignIn } from './src/pages'
import Home from './src/pages/Home.jsx'
import { StyleSheet } from 'react-native';
import SignIn from './src/pages/SignIn.jsx'
import SignUp from './src/pages/SignUp.jsx'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Button } from './src/Styles'


const Stack = createStackNavigator();

const newScreen = (name, component, options) => {
  return <Stack.Screen name={name} component={component} options={options} />
}

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Button /> */}
        {newScreen('SignIn', SignIn, { headerShown: false })}
        {newScreen('SignUp', SignUp, { title: '' })}
        {newScreen('Home', Home, { title: 'Resumo Inicial' })}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;


const styles = StyleSheet.create({

})