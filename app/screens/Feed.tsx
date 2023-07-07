import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, FlatList, Image, StyleSheet  } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';



const Feed = ({ route }: any) => {
    const navigation = useNavigation();
    const userInfo = route.params.userInfo;
    const [noticias, setNoticias] = useState<any[]>([]);

    useEffect(() => {
        const NoticiasRef = collection(FIRESTORE_DB, 'Noticias');
        const subscriber = onSnapshot(NoticiasRef, {
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

    const moveToAlter = async (id: any, userInfo: any) => {
        navigation.navigate("Alterar", { id }, { userInfo })
    }

    const ExcluirDoc = async (id: any, imageUrl: any) => {
        try {
            const document = collection(FIRESTORE_DB, "Noticias")
            const noticia = doc(document, id);
            await deleteDoc(noticia);

        } catch (error) {
            alert("Erro ao excluir! " + error);
        }
    }

    return (
        <View style = {styles.container}>            
            <FlatList
                
                data = {noticias}
                renderItem={({item}) => (
                    <><View>
                        <Text style={styles.title}>{item.title}</Text>
                        <View>
                            <Image style={styles.img} source={{ uri: item.imagem }} resizeMode='cover' />
                        </View>
                        <Text style={styles.body}>{item.noticia}</Text>
                        <Text style={styles.date}>{item.data}</Text>

                        <View style={styles.separator} />
                    </View>
                        {item.fundador === userInfo?.email &&
                            <><TouchableOpacity style={styles.editBtn} onPress={() => moveToAlter(item.id, userInfo)}>
                                <Text style={styles.editTxt}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editBtn} onPress={() => ExcluirDoc(item.id, item.imageUrl)}>
                                <Text style={styles.editTxt}>Excluir</Text>
                            </TouchableOpacity></>
                        }
                       </>

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
    editBtn: {
        justifyContent: 'flex-end',
        textAlign: 'center',
        backgroundColor: '#F8FDCF',
        marginTop: 20,
        marginHorizontal: 10,
        padding: 10,
        width: 70,
        borderRadius: 3,
        borderWidth: 3,
        borderColor: '#E2F6CA',
        borderStyle: 'solid', 
    },
    editTxt: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 12,
    },
    separator: {
        marginVertical: 20,
        borderBottomColor: "#FFF",
        borderBottomWidth: StyleSheet.hairlineWidth
      }
});