import React, { useContext, useState, useEffect } from "react";
import { TextInput } from "react-native";
import { WorkingContext } from "../context/WorkingContext";
import { saveToDos } from "../asyncStorage";
import styles from "../styles/InputStyles";

const Input = () => {
  const { working, toDos, setToDos } = useContext(WorkingContext);
  const [text, setText] = useState("");

  const onChangeText = (e) => setText(e);

  const addToDo = async () => {
    const regex = /^\s*$/; // 빈 문자, 공백, 개행문자만 있는지 확인하는 정규 표현식
    if (regex.test(text)) return;

    const toDo = { [Date.now()]: { working, text } };
    const newToDos = { ...toDos, ...toDo };

    // 저장
    setToDos({ ...newToDos });
    await saveToDos({ ...newToDos });
    setText("");
  };

  useEffect(() => {
    setText("");
  }, [working]);

  return (
    <TextInput
      style={styles.input}
      placeholder={working ? "할 일을 추가하세요." : "어디로 가고 싶나요?"}
      value={text}
      onChangeText={onChangeText}
      onSubmitEditing={addToDo}
      returnKeyType="done"
    />
  );
};

export default Input;
