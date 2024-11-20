import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import CityName from "./components/CityName";
import DayScroll from "./components/DayScroll";
import { getWeatherData } from "./utils/weatherUtils";
import styles from "./styles/AppStyles";

export default function App() {
  const [address, setAddress] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const fetchWeather = async () => {
    const { address, days } = await getWeatherData(setOk);
    setAddress(address);
    setDays(days);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CityName address={address} />
      <DayScroll days={days} />
    </View>
  );
}
