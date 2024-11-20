import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";
import { WEATHER_API_KEY } from "./key";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const weatherIcons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Atmosphere: "cloudy-gusts",
  Snow: "snowflake",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [address, setAddress] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    // 권한 요청
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    // 현재 위치에서 위도, 경도 추출
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 6 });

    // Reverse Geocode를 통해 현재 위치의 주소 추출
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );

    // 주소 파싱
    const { country, region, district, city, formattedAddress } = location[0];

    const removeCountryFromAddress = (address, country) => {
      const regex = new RegExp(`^${country}\\s*`, "g");
      return address.replace(regex, "");
    };

    const textAddress = removeCountryFromAddress(formattedAddress, country);
    // setAddress(district || city);
    setAddress(textAddress);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&&APPID=${WEATHER_API_KEY}&units=metric`
    );
    const json = await response.json();
    const convertJson = json.list.filter((weather) => {
      if (weather.dt_txt.includes("12:00:00")) {
        return weather;
      }
    });

    setDays(convertJson);
  };

  useEffect(() => {
    getWeather();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "long",
      day: "numeric",
      weekday: "long",
      locale: "ko-KR",
    };
    return date.toLocaleDateString("ko-KR", options);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{address}</Text>
      </View>
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
          days.map((day, index) => {
            const weather = day.weather[0].main;

            return (
              <View key={`day-${index}`} style={styles.day}>
                <Text style={styles.date}>{formatDate(day.dt_txt)}</Text>
                <View style={styles.tempAndIcon}>
                  <Text style={styles.temp}>
                    {parseFloat(day.main.temp).toFixed(1)}°
                  </Text>
                  <Fontisto
                    name={weatherIcons[weather]}
                    size={70}
                    color="white"
                  />
                </View>
                <Text style={styles.description}>{weather}</Text>
                <Text style={styles.tinyText}>
                  {day.weather[0].description}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9370db",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "white",
    fontSize: 25,
    fontWeight: "600",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
  },
  date: {
    marginLeft: 20,
    marginBottom: -70,
    color: "white",
    fontSize: 20,
  },
  tempAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    justifyContent: "space-between",
  },
  temp: {
    marginLeft: 20,
    marginTop: 50,
    color: "white",
    fontSize: 100,
  },
  description: {
    marginLeft: 20,
    marginTop: -30,
    color: "white",
    fontSize: 40,
  },
  tinyText: {
    marginLeft: 20,
    marginTop: -10,
    color: "white",
    fontSize: 20,
  },
});
