import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { WorkingContext } from "../context/WorkingContext";
import { theme } from "../colors";
import styles from "../styles/ButtonStyles";

const Button = ({ text, func }) => {
  const { working } = useContext(WorkingContext);

  return (
    <TouchableOpacity onPress={func}>
      <Text
        style={{
          ...styles.btnText,
          color:
            (text === "할 일" && working) || (text === "여행" && !working)
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
