import { NavigationContainer } from '@react-navigation/native';
import { collection, doc, DocumentSnapshot, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { firestore } from 'react-native-firebase';
import { FIRESTORE_DB } from '../../firebaseConfig';

const Alterar = ( {route, navigation}: any) => {
    const {id} = route.params;
    const [tarefa, setTarefa] = useState<any>({});
    
    useEffect(() => {
        const fetchTarefa = async () => {
            const colecao = doc(FIRESTORE_DB, 'Tarefas', id);
            const colecaoSnapshot = await getDoc(colecao);
            if (colecaoSnapshot.exists()){
                setTarefa ({
                    id: colecaoSnapshot.id,
                    ...colecaoSnapshot.data()
                });
            }
        }

        fetchTarefa();
    }, []);

    const handleAtualizarTexto = (key: string, value: string) => {
        setTarefa({
            ...tarefa,
            [key]: value
        });
    }

    const handleUpdateTarefa = async () => {
        const colecao = doc(FIRESTORE_DB, 'Tarefas', id);
        await updateDoc(colecao, tarefa);
        navigation.navigate('Lista');
        alert("Tarefa alterada com sucesso!");
    }

    return (
        <View >
                <View >
                    <TextInput style = {styles.input} 
                    value={tarefa.title}
                    onChangeText= {(t) => handleAtualizarTexto('title',t)}
                    />
                    <TextInput style = {styles.input}
                        value={tarefa.done}
                        onChangeText = {(t) => handleAtualizarTexto('done', t)}
                    />
                    <TouchableOpacity style = {styles.button} onPress= {handleUpdateTarefa}>
                        <Text style = {styles.btnText}>Alterar</Text>  
                    </TouchableOpacity> 

                </View>
        </View>
    );
}

export default Alterar;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin:10,
        fontSize: 16,
        borderColor: "#041122",
        borderWidth: 2,
        borderRadius: 3,
        color: "#259073",
        backgroundColor: "#e3edd2",
    },
    button: {
        flex:1,
        padding: 5,
        textAlign: 'center',
        backgroundColor: "#041122",
           
    },
    btnText: {
        color: "#259073",
    }


})