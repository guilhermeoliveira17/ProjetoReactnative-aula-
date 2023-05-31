import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FIRESTORE_DB, STORAGE } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';


const Cadastro = () => {

    const [titulo, setTitulo] = useState('');
    const [noticia, setNoticia] = useState('');
    const [data, setData] = useState('');
    const [imagem, setImagem] = useState('');

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
        
        async function uploadImage(imageFile: File) {
            const storageRef = ref(STORAGE, 'images/' + new Date().getTime());
          
            try {
              await uploadBytes(storageRef, imageFile);
          
              const downloadURL = await getDownloadURL(storageRef);
          
              console.log('URL de download:', downloadURL);
            } catch (error) {
              console.error('Erro ao fazer o upload da imagem:', error);
            }
          }
          
          const imageFile = imagem as unknown as File
          uploadImage(imageFile);
       

        try {
            const doc = addDoc(collection(FIRESTORE_DB, 'Noticias'), { title: titulo, noticia: noticia, data: data, imagem: imagem });
            setNoticia('');
            setTitulo('');
            setData('');
            alert("Notícia publicada com sucesso!");
            
        } catch (error) {
            alert(error + "Erro ao publicar a notícia")
        }
        
    }
    return (
        <View style= {styles.container}>

            <TextInput style = {styles.title}
                placeholder="Informe o título da notícia"
                onChangeText={(t: string) => setTitulo(t)}
                value={titulo}
            />

            <TextInput style = {styles.notices}
                placeholder="Detalhes da notícia"
                onChangeText={(t: string) => setNoticia(t)}
                value={noticia}
            />

            <TextInput style = {styles.date}
                placeholder="Data do ocorrido"
                onChangeText={(t: string) => setData(t)}
                value={data}
            />

            <TouchableOpacity style = {styles.btnImg} onPress={selectImage}>
                <Text style= {styles.txtImg}>Escolher imagem</Text>
            </TouchableOpacity>


            {titulo != '' && noticia != '' && data != '' && imagem !='' &&
            <TouchableOpacity style = {styles.btnSend} onPress={addNoticia}>
                <Text style = {styles.txtSend}>Publicar notícia</Text>
            </TouchableOpacity>
            
            }


        </View>

    );
}
export default Cadastro;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#182747',
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
        textAlign: 'center',
        fontWeight: 'bold',
    },
    notices: {
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
        textAlign: 'center',
        fontWeight: 'bold'
    },
    date: {
        fontSize: 16,
        backgroundColor: '#9DB2BF',
        color: '#526D82',
        padding: 5,
        marginVertical: 15,
        marginHorizontal: 15,
        borderRadius: 5,
        borderColor: '#27374D',
        borderStyle: 'solid',
        borderWidth: 2,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    btnImg: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#27374D',
        marginTop: 20,
        padding: 10,
        alignSelf: 'center',
        width: 200,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#526D82',
        borderStyle: 'solid',
    },
    txtImg: {
        color: '#DDE6ED',
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnSend: {
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
    txtSend: {
        color: '#DDE6ED',
        fontWeight: 'bold',
        fontSize: 16,
    }

});