import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { CheckBox } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { WorkingContext } from "../context/WorkingContext";
import { saveToDos, getDeletedToDos, updateToDos } from "../asyncStorage";
import styles from "../styles/TodoStyles";

const Todo = ({ objectKey, toDo }) => {
  const { setToDos } = useContext(WorkingContext);
  const [isChecking, setIsChecking] = useState(toDo.checking);

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

  const checkToDo = async (key, toDo) => {
    const newToDo = { ...toDo, checking: !isChecking };
    setIsChecking(!isChecking);

    const newToDos = await updateToDos(key, { ...newToDo });
    setToDos({ ...newToDos });
  };

  return (
    <View style={styles.todo}>
      <View style={styles.data}>
        <CheckBox
          checked={isChecking}
          onPress={() => checkToDo(objectKey, toDo)}
        />
        <Text style={styles.text}>{toDo.text}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteToDo(objectKey)}>
        <Fontisto name="trash" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;
