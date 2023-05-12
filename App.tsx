import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import detalhes from './app/screens/detalhes';
import lista from './app/screens/lista';
import cadastro from './app/screens/cadastro';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cadastro" component={cadastro}/>
          <Stack.Screen name="Lista" component={lista}/>
          <Stack.Screen name="Detalhes" component={detalhes}/>
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
