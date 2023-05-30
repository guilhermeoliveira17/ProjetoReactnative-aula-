import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FIRESTORE_DB, STORAGE } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';


const Cadastro = ({ navigation }: any) => {

    const [titulo, setTitulo] = useState('');
    const [noticia, setNoticia] = useState('');
    const [data, setData] = useState('');
    const [imagem, setImagem] = useState('');
    const [uploanding, setUploading] = useState(false);

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if(!result.canceled) {
            setImagem(result.assets[0].uri);
        }
    }

    

    const addNoticia = async () => {
        setUploading(true);
        const refe = ref(STORAGE, 'images/' + new Date().getTime());
        const response = await fetch(imagem);
        const blob = await response.blob();

        await uploadBytes(refe, blob);
        const url = await getDownloadURL(refe);

        try {
            
        } catch (error) {
            alert(error + "Erro ao publicar a notícia")
        }
        const doc = addDoc(collection(FIRESTORE_DB, 'Noticias'), { title: titulo, noticia: noticia, data: data, imagem: imagem });
        setNoticia('');
        setTitulo('');
        setData('');
        alert("Notícia publicada com sucesso!");
    }
    return (
        <View style= {styles.container}>

            <TextInput style = {styles.title}
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

            <TouchableOpacity onPress={selectImage}>
                <Text>Escolher imagem</Text>
            </TouchableOpacity>


            {titulo != '' && noticia != '' && data != '' && imagem !='' &&
            <TouchableOpacity onPress={addNoticia}>
                <Text>Publicar notícia</Text>
            </TouchableOpacity>
            
            }


        </View>

    );
}
export default Cadastro;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDE6ED'

    },
    title: {
        fontSize: 16,
        backgroundColor: '#9DB2BF',
        color: '#526D82',
        borderRadius: 5,
        padding: 5,
        marginVertical: 15,
        marginHorizontal: 15,
        borderColor: '#27374D',
        borderStyle: 'solid',
        borderWidth: 2,
        

    }



});