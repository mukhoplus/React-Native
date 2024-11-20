import React from "react";
import { View, Text } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { formatDate } from "../utils/dateUtils";
import { weatherIcons, weatherTranslate } from "../utils/weatherUtils";
import styles from "../styles/WeatherCardStyles";

const WeatherCard = ({ day }) => {
  const weather = day.weather[0].main;

  return (
    <View style={styles.day}>
      <Text style={styles.date}>{formatDate(day.dt_txt)}</Text>
      <View style={styles.tempAndIcon}>
        <Text style={styles.temp}>{`${parseFloat(day.main.temp).toFixed(
          1
        )}°`}</Text>
        <Fontisto name={weatherIcons[weather]} size={70} color="white" />
      </View>
      <Text style={styles.description}>{weatherTranslate(weather)}</Text>
      <Text style={styles.tinyText}>{day.weather[0].description}</Text>
    </View>
  );
};

export default WeatherCard;
