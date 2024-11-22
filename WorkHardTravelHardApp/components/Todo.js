import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import { CheckBox } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { WorkingContext } from "../context/WorkingContext";
import { saveToDos, getDeletedToDos, updateToDos } from "../asyncStorage";
import styles from "../styles/TodoStyles";

const OS = Platform.OS;

const Todo = ({ objectKey, toDo }) => {
  const { setToDos } = useContext(WorkingContext);
  const [isChecking, setIsChecking] = useState(toDo.checking);

  const confirmDelete = async (key) => {
    const deletedToDos = await getDeletedToDos(key);
    setToDos({ ...deletedToDos });
    await saveToDos({ ...deletedToDos });
  };

  const deleteToDo = async (key) => {
    try {
      if (OS === "web") {
        const ok = confirm("정말 삭제하실 건가요?");
        if (ok) {
          await confirmDelete(key);
        }
      } else {
        Alert.alert("삭제", "정말 삭제하실 건가요?", [
          { text: "아니오" },
          {
            text: "예",
            onPress: async () => {
              await confirmDelete(key);
            },
          },
        ]);
      }
    } catch (e) {}
  };

  const checkToDo = async (key, toDo) => {
    // ToDo 컴포넌트 수정
    const newToDo = { ...toDo, checking: !isChecking };
    setIsChecking(!isChecking);

    // 저장소 및 로컬 저장소 업데이트
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
        <Text
          style={[
            styles.text,
            isChecking && { textDecorationLine: "line-through" },
          ]}
        >
          {toDo.text}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteToDo(objectKey)}>
        <Fontisto name="trash" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;
