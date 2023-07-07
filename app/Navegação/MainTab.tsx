import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cadastro from '../screens/Cadastro';
import Feed from '../screens/Feed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useNavigation, useRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const userInfo = route.params?.userInfo ?? null;
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let icon;

                if (route.name === 'Feed') {
                    icon = faHome;
                } else if (route.name === 'Cadastro') {
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
        <Tab.Screen name="Feed" component={Feed}  initialParams={{userInfo: userInfo}} />
        <Tab.Screen name="Cadastro" component={Cadastro} initialParams={{userInfo: userInfo}} />
    </Tab.Navigator>
    );
}
