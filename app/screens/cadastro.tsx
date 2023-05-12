import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';


const cadastro = ({ navigation }: any) => {

const [tarefa, setTarefa] = useState('');

const addTarefa = async() => {
    const doc = addDoc(collection(FIRESTORE_DB, 'Tarefas'), { title: tarefa, done: false });
    setTarefa('');
    alert("Tarefa cadastrada com sucesso!");
    }



return (
            <View>

            <TextInput 
                placeholder= "Informe a tarefa"
                onChangeText = {(t:string) => setTarefa(t)}
                value= {tarefa}
            />

            <Button
                title="Adicionar Tarefa"
                onPress={() => addTarefa()}
                disabled= {tarefa === ''}
            />
            <Button
                title="Lista de tarefas"
                onPress={() => navigation.navigate('Lista')}
            />
            </View>

        );
}

export default cadastro;