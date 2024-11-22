import React, { useContext, useEffect } from "react";
import { ScrollView } from "react-native";
import { WorkingContext } from "../context/WorkingContext";
import Todo from "./Todo";
import { getSavedToDos } from "../asyncStorage";
import styles from "../styles/ListStyles";

const List = () => {
  const { working, toDos, setToDos } = useContext(WorkingContext);

  const loadToDos = async () => {
    try {
      const savedToDos = await getSavedToDos();
      setToDos({ ...savedToDos });
    } catch (e) {
      setToDos({});
    }
  };

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <ScrollView>
      {Object.entries(toDos).map(([key, toDo]) =>
        toDo.working === working ? (
          <Todo style={styles.todo} key={key} objectKey={key} toDo={toDo} />
        ) : null
      )}
    </ScrollView>
  );
};

export default List;
