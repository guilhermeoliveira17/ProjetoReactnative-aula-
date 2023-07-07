import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import MainTab from './MainTab';
import { useNavigation, useRoute } from '@react-navigation/native';
import Alterar from '../screens/Alterar';
const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#182747"
                },
                headerTitleStyle: {
                    fontSize: 24,
                    color: "#D8D8D8"
                },
            }}
        >
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Feed" component={MainTab}/>
            <Stack.Screen name="Alterar" component={Alterar}/>

        </Stack.Navigator>
    );
};
