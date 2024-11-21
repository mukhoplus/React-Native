import React, { useContext } from "react";
import { View } from "react-native";
import { WorkingContext } from "../context/WorkingContext";
import Button from "./Button";
import styles from "../styles/HeaderStyles";

const Header = () => {
  const { setWorking } = useContext(WorkingContext);

  const work = () => setWorking(true);
  const travel = () => setWorking(false);

  return (
    <View style={styles.header}>
      <Button text={"할 일"} func={work} />
      <Button text={"여행"} func={travel} />
    </View>
  );
};

export default Header;
