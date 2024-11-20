import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/CityNameStyles";

const CityName = ({ address }) => {
  return (
    <View style={styles.city}>
      <Text style={styles.cityName}>{address}</Text>
    </View>
  );
};

export default CityName;
