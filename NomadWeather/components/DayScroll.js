import React from "react";
import { ScrollView } from "react-native";
import LoadingCard from "./LoadingCard";
import WeatherCard from "./WeatherCard";
import styles from "../styles/WeatherCardStyles";

const DayScroll = ({ days }) => {
  return (
    <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.weather}
    >
      {days.length === 0 ? (
        <LoadingCard />
      ) : (
        days.map((day, index) => <WeatherCard key={`day-${index}`} day={day} />)
      )}
    </ScrollView>
  );
};

export default DayScroll;
