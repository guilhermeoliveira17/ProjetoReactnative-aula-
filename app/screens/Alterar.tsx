import { NavigationContainer } from '@react-navigation/native';
import { collection, doc, DocumentSnapshot, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { firestore } from 'react-native-firebase';
import { FIRESTORE_DB, STORAGE } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Alterar = ({ route, navigation }: any) => {
  const { id } = route.params;
  const userInfo = route.params.userInfo;
  const [noticia, setNoticia] = useState<any>({});
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [image, setImage] = useState('');

  const imagem = image !== '' ? image : noticia.imagem;

  useEffect(() => {
    const fetchNoticia = async () => {
      const colecao = doc(FIRESTORE_DB, 'Noticias', id);
      const colecaoSnapshot = await getDoc(colecao);
      if (colecaoSnapshot.exists()) {
        setNoticia({
          id: colecaoSnapshot.id,
          ...colecaoSnapshot.data()
        });
      }
    };

    fetchNoticia();
  }, []);

  const handleAtualizarTexto = (key: string, value: string) => {
    setNoticia({
      ...noticia,
      [key]: value
    });
  };

  const UpdateNoticia = async () => {
    try {
      if (imagem !== noticia.imagem) {
        const downloadURL = await uploadImage(imagem);
        await handleAtualizarTexto('imagem', downloadURL);
      }

      const docData = {
        title: noticia?.title || '',
        noticia: noticia?.noticia,
        data: noticia?.data || '',
        imagem: imagem,
         likes: 0,
        fundador: noticia?.fundador || ''
      };

      const noticiaRef = doc(FIRESTORE_DB, 'Noticias', id);
      await updateDoc(noticiaRef, docData);
      setNoticia({});
      setTitulo('');
      setData('');
      alert('Notícia editada com sucesso!');
      navigation.navigate('Feed', { userInfo: userInfo });
    } catch (error) {
      alert(error + 'Erro ao atualizar a notícia');
    }
  };

  const uploadImage = async (imageFile: string) => {
    const storageRef = ref(STORAGE, 'images/' + new Date().getTime());
    try {
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      console.log('URL de download:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer o upload da imagem:', error);
      throw error;
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if(!result.canceled) {
        setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        value={noticia?.title}
        onChangeText={(t) => handleAtualizarTexto('title', t)}
      />
      <TextInput
        style={styles.notices}
        value={noticia?.noticia}
        onChangeText={(t) => handleAtualizarTexto('noticia', t)}
      />
      <TextInput
        style={styles.date}
        value={noticia?.data}
        onChangeText={(t) => handleAtualizarTexto('data', t)}
      />

      <TouchableOpacity style={styles.btnImg} onPress={selectImage}>
        <Text style={styles.txtImg}>Escolher imagem</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSend} onPress={UpdateNoticia}>
        <Text style={styles.txtSend}>Atualizar notícia</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Alterar;


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