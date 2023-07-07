import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, FlatList, Image, StyleSheet  } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const [userInfo, setUserInfo] = React.useState<any>(null);
    const navigation = useNavigation();
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "1086481132376-ulndlu2vf43druicnr8itrlet5hfpqh2.apps.googleusercontent.com",
        webClientId: "1086481132376-30n40b66pd98dhbskp6h86cu4k0lcmb7.apps.googleusercontent.com",
        expoClientId: "1086481132376-neig2b4g9ghq7fotns9ik1p02eh9f960.apps.googleusercontent.com"

    },{
        projectNameForProxy: "@guilhermeoliv/fireapp"
    }
    ); 

    React.useEffect(() => {
        SignWithGoogle();
    }, [response])
    
    async function SignWithGoogle() {
        const user = await AsyncStorage.getItem("@user");
        if(!user){
            if (response?.type === "success") {
                await getUserInfo(response.authentication?.accessToken);
            }

        } else {
            setUserInfo(JSON.parse(user));
        }
    }

    const getUserInfo = async (token: any) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
            navigation.navigate('Feed', { userInfo: user });
            
        } catch (error) {
            // Add your own error handler here
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem-vindo ao Folha de Rive</Text>
            <TouchableOpacity onPress={() => promptAsync({projectNameForProxy: "@guilhermeoliv/fireapp"})} style={styles.btn}>
                <Text style={styles.BtnTxt}>Login com o Google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => AsyncStorage.removeItem("@user")} style={styles.btn}>
                <Text style={styles.BtnTxt}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#27374D',
        marginTop: 20,
        padding: 10,
        alignSelf: 'center',
        width: 200,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#526D82',
        borderStyle: 'solid',
    },
    BtnTxt: {
        color: '#DDE6ED',
        fontWeight: 'bold',
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#182747',
    },
    text: {
        color: '#DDE6ED',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 50
    }
})

