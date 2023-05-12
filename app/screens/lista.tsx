import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';

const lista = ({ navigation }: any) => {

    
    const [tarefas, setTarefas] = useState<any[]>([]);

    useEffect(() => {
        const TarefasRef = collection(FIRESTORE_DB, 'Tarefas');

        const subscriber = onSnapshot(TarefasRef, {
            next: (snapshot) => {
                const tarefas: any[] = [];
                snapshot.docs.forEach(doc => {
                    tarefas.push({
                        id: doc.id,
                        ...doc.data(),

                    })
                })
                setTarefas(tarefas);
            }
        })
        return () => subscriber();
    }, [])

    

    const ExcluirElemento = async (id:any) => {
        try {
            const colecao = collection(FIRESTORE_DB, "Tarefas");
            const elemento = doc(colecao, id);
            await deleteDoc(elemento);
            alert("Elemento excluído!");
            
        } catch (error) {
            alert("Falha ao excluir! " + error);
        }
    }
    return (
        <View>
            
             <Button
                title="cadastro de tarefas"
                onPress={() => navigation.navigate('Cadastro')}
            />
           
            
            <View>
                {tarefas.map((tarefa) => (
                    <>
                    <Text key={tarefa.id}>{tarefa.title}</Text>
                    <TouchableOpacity onPress= {() => ExcluirElemento(tarefa.id)}>
                        <Text>Excluir</Text>
                    </TouchableOpacity>
                    </>
                ))}

            </View>
        </View>
    );
}

export default lista;