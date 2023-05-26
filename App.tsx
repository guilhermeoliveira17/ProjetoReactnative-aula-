import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detalhes from './app/screens/Detalhes';
import Feed from './app/screens/Feed';
import Cadastro from './app/screens/Cadastro';
import Alterar from './app/screens/Alterar';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cadastro" component={Cadastro}/>
          <Stack.Screen name="Feed" component={Feed}/>
          <Stack.Screen name="Alterar" component={Alterar}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
