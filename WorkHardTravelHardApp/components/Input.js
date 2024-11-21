import React, { useState, useContext, useEffect } from "react";
import { TextInput } from "react-native";
import { WorkingContext } from "../context/WorkingContext";
import styles from "../styles/InputStyles";

const Input = () => {
  const { working, toDos, setToDos } = useContext(WorkingContext);
  const [text, setText] = useState("");

  const onChangeText = (e) => setText(e);
  const addToDo = () => {
    const regex = /^\s*$/; // 빈 문자, 공백, 개행문자만 있는지 확인하는 정규 표현식
    if (regex.test(text)) return;

    const toDo = { [Date.now()]: { work: working, text } };
    const newToDos = { ...toDos, ...toDo };

    // 저장
    setToDos({ ...newToDos });
    setText("");
  };

  useEffect(() => {
    setText("");
  }, [working]);

  return (
    <TextInput
      style={styles.input}
      placeholder={working ? "Add a To Do." : "Where do you want go?"}
      value={text}
      onChangeText={onChangeText}
      onSubmitEditing={addToDo}
      returnKeyType="done"
    />
  );
};

export default Input;
