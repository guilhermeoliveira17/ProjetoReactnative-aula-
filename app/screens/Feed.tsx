import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, FlatList, Image, StyleSheet  } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';
import LikeButton from '../components/LikeButton';


const Feed = () => {

    const [noticias, setNoticias] = useState<any[]>([]);

    useEffect(() => {
        const NoticiasRef = collection(FIRESTORE_DB, 'Noticias');
        const order = query(NoticiasRef, orderBy('likes', 'desc'));
        const subscriber = onSnapshot(order, {
            next: (snapshot) => {
                const noticias: any[] = [];
                snapshot.docs.forEach(doc => {
                    noticias.push({
                        id: doc.id,
                        ...doc.data(),

                    })
                })
                setNoticias(noticias);
            }
        })
        return () => subscriber();
    }, [])


    return (
        <View style = {styles.container}>            
            <FlatList
                
                data = {noticias}
                renderItem={({item}) => (
                    <View>
                        <Text style = {styles.title}>{item.title}</Text> 
                        <View>
                            <Image style= {styles.img} source = {{uri: item.imagem }} resizeMode='cover'/>
                        </View>
                        <Text style = {styles.body}>{item.noticia}</Text>
                        <Text style = {styles.date}>{item.data}</Text>
                        <LikeButton key={item.id} item={item}/>
                        
                        <View style = {styles.separator}/>
                    </View>

                )}
            />
        </View>
    );
}   

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#182747',
        borderBottomWidth: 2,
        borderStyle: 'solid',
        borderBottomColor: '#000',
    },
    title: {
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#D8D8D8',
        marginVertical: 30,
    },
    body: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 15,
        color: '#647E68',
        marginTop: 20,
        fontWeight: 'bold',
        marginHorizontal: 40,
        backgroundColor: '#F4EEE0',
        padding: 5,
        borderRadius: 5,
    },
    img:{
        width: 300,
        height: 250,
        borderRadius: 8,
        alignSelf: 'center',
    },
    date: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 10,
        color: '#647E68',
    },
    separator: {
        marginVertical: 20,
        borderBottomColor: "#FFF",
        borderBottomWidth: StyleSheet.hairlineWidth
      }
});