import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cadastro from '../screens/Cadastro';
import Feed from '../screens/Feed';
import CarouselCards from '../screens/CarouselCards';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;

        if (route.name === 'Feed') {
          icon = faHome;
        } else if (route.name === 'Publicar notícia') {
          icon = faPlus;
        }

        return icon ? <FontAwesomeIcon icon={icon} size={size} color={color} /> : null;
      },
      headerStyle: {
        backgroundColor: '#182747',
      },
      headerTitleStyle: {
        color: '#D8D8D8',
      },
    })}
      tabBarOptions={{
        showLabel: false,
        tabStyle: {
          backgroundColor: '#182747'
        },
      }}

    >
      <Tab.Screen options={{
          headerTitleAlign: 'center',
        }}
        name="Feed"
        component={Feed} />

      <Tab.Screen options={{
          headerTitleAlign: 'center',
        }}
        name="Publicar notícia"
        component={Cadastro} />


    </Tab.Navigator>
  );
};