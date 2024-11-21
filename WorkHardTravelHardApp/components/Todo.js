import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { WorkingContext } from "../context/WorkingContext";
import { saveToDos, getDeletedToDos } from "../asyncStorage";
import styles from "../styles/TodoStyles";

const Todo = ({ objectKey, toDo }) => {
  const { setToDos } = useContext(WorkingContext);

  const deleteToDo = async (key) => {
    try {
      Alert.alert("삭제", "정말 삭제하실 건가요?", [
        { text: "아니오" },
        {
          text: "예",
          onPress: async () => {
            const deletedToDos = await getDeletedToDos(key);
            setToDos({ ...deletedToDos });
            await saveToDos({ ...deletedToDos });
          },
        },
      ]);
    } catch (e) {}
  };

  return (
    <View style={styles.todo}>
      <Text style={styles.text}>{toDo.text}</Text>
      <TouchableOpacity onPress={() => deleteToDo(objectKey)}>
        <Fontisto name="trash" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;
