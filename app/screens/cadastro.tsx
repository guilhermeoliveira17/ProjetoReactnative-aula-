import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';

const Cadastro = ({ navigation }: any) => {

    const [titulo, setTitulo] = useState('');
    const [noticia, setNoticia] = useState('');
    const [data, setData] = useState('');

    const addNoticia = async () => {
        const doc = addDoc(collection(FIRESTORE_DB, 'Noticias'), { title: titulo, noticia: noticia, data: data });
        setNoticia('');
        setTitulo('');
        setData('');
        alert("Noticia publicada com sucesso!");
    }
    return (
        <View>

            <TextInput
                placeholder="Informe o título da noticia"
                onChangeText={(t: string) => setTitulo(t)}
                value={titulo}
            />

            <TextInput
                placeholder="Detalhes da noticia"
                onChangeText={(t: string) => setNoticia(t)}
                value={noticia}
            />

            <TextInput
                placeholder="Data do ocorrido"
                onChangeText={(t: string) => setData(t)}
                value={data}
            />


            <Button
                title="Publicar noticia"
                onPress={() => addNoticia()}
                disabled={noticia === '' && titulo === '' && data === ''}
            />
            <Button
                onPress={() => navigation.navigate("Feed")}
                title="Feed"
            />


        </View>

    );
}
export default Cadastro;