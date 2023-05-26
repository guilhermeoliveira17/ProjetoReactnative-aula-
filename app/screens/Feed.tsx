import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';

const Feed = ({ navigation }: any) => {

    
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

    

    const ExcluirElemento = async (id:any) => {
        try {
            const colecao = collection(FIRESTORE_DB, "Noticias");
            const elemento = doc(colecao, id);
            await deleteDoc(elemento);
            alert("Noticia excluída!");
            
        } catch (error) {
            alert("Falha ao excluir! " + error);
        }
    }

    const AlterarElemento = (id: any) => {
        navigation.navigate('Alterar', {id});
    }

    return (
        <View>
            
             <Button
                title="Publicar nova noticia"
                onPress={() => navigation.navigate('Cadastro')}
            />
           
           
            
            <View>
                {noticias.map((noticia) => (
                    <>
                    <Text key={noticia.id}>{noticia.title}</Text>
                    <Text key={noticia.id}>{noticia.noticia}</Text>
                    <Text key={noticia.id}>{noticia.data}</Text>
                    <TouchableOpacity onPress= {() => ExcluirElemento(noticia.id)}>
                        <Text>Excluir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress= {() => AlterarElemento(noticia.id)}>
                        <Text>Alterar</Text>
                    </TouchableOpacity>
                    </>
                ))}

            </View>
        </View>
    );
}

export default Feed;