import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@toDos";

export const getSavedToDos = async () => {
  const s = await AsyncStorage.getItem(STORAGE_KEY);
  const savedToDos = JSON.parse(s);
  return { ...savedToDos };
};

export const saveToDos = async (toDos) => {
  const s = JSON.stringify(toDos);
  await AsyncStorage.setItem(STORAGE_KEY, s);
};

export const getDeletedToDos = async (key) => {
  const deletedToDos = await getSavedToDos();
  delete deletedToDos[key];
  return { ...deletedToDos };
};

export const updateToDos = async (key, toDo) => {
  const savedToDos = await getSavedToDos();
  const newToDos = Object.entries(savedToDos).reduce((acc, [k, v]) => {
    if (k === key) {
      const newSubObject = { [k]: { ...toDo } };
      return { ...acc, ...newSubObject };
    }
    return { ...acc, [k]: v };
  }, {});
  await saveToDos({ ...newToDos }); // 저장소 업데이트
  return { ...newToDos };
};
