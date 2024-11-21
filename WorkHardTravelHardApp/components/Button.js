import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { WorkingContext } from "../context/WorkingContext";
import styles from "../styles/ButtonStyles";
import { theme } from "../colors";

const Button = ({ text, func }) => {
  const { working } = useContext(WorkingContext);

  return (
    <TouchableOpacity onPress={func}>
      <Text
        style={{
          ...styles.btnText,
          color:
            (text === "Work" && working) || (text === "Travel" && !working)
              ? "white"
              : theme.grey,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
