import React from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import WeatherCard from "./WeatherCard";
import styles from "../styles/DayScrollStyles";

const DayScroll = ({ days }) => {
  return (
    <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.weather}
    >
      {days.length === 0 ? (
        <View style={{ ...styles.day, alignItems: "center" }}>
          <ActivityIndicator color="white" style={{ marginTop: 10 }} />
        </View>
      ) : (
        days.map((day, index) => <WeatherCard key={`day-${index}`} day={day} />)
      )}
    </ScrollView>
  );
};

export default DayScroll;
