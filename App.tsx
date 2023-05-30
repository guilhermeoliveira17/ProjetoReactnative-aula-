import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detalhes from './app/screens/Detalhes';
import Feed from './app/screens/Feed';
import Cadastro from './app/screens/Cadastro';
import Alterar from './app/screens/Alterar';
import MainTab from './app/Navegação/MainTab';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <MainTab />
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
