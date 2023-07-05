import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';

interface LikesProps {
  item: {
    id: string;
    likes: number;
  };
}

const LikeButton: React.FC<LikesProps> = ({ item }) => {
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  const handleLike = async (itemId: string) => {
    try {
      const noticiasCollection = collection(FIRESTORE_DB, "Noticias");
      const noticia = doc(noticiasCollection, itemId);

      const updatedData = {
        likes: likedItems[itemId] ? item.likes - 1 : item.likes + 1,
      };

      await updateDoc(noticia, updatedData);
    } catch (error) {
      alert("Erro ao curtir! ");
    }

    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [itemId]: !prevLikedItems[itemId],
    }));
  };


  return (
    <TouchableOpacity style={styles.like} onPress={() => handleLike(item.id)}>
      <FontAwesomeIcon icon={faFireFlameCurved} size={20} color="white" />
      <Text style={styles.text}>{item.likes}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  like: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    marginHorizontal: 10
  },
  text: {
    color: "#9D9D9D",
    fontWeight: "bold"
  }
});

export default LikeButton;
