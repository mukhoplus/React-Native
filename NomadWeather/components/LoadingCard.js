import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "../styles/WeatherCardStyles";

const LoadingCard = () => {
  return (
    <View style={{ ...styles.day, alignItems: "center" }}>
      <ActivityIndicator color="white" style={{ marginTop: 10 }} />
    </View>
  );
};

export default LoadingCard;
