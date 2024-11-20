import * as Location from "expo-location";
import { WEATHER_API_KEY } from "../key";

export const getWeatherData = async (setOk) => {
  const { granted } = await Location.requestForegroundPermissionsAsync();
  if (!granted) {
    setOk(false);
    return { address: "위치 권한이 필요합니다.", days: [] };
  }

  const {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync({ accuracy: 6 });

  const location = await Location.reverseGeocodeAsync(
    { latitude, longitude },
    { useGoogleMaps: false }
  );

  const { country, formattedAddress } = location[0];
  const textAddress = removeCountryFromAddress(formattedAddress, country);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&&APPID=${WEATHER_API_KEY}&units=metric`
  );
  const json = await response.json();
  const convertJson = json.list.filter((weather) =>
    weather.dt_txt.includes("12:00:00")
  );

  return { address: textAddress, days: convertJson };
};

const removeCountryFromAddress = (address, country) => {
  const regex = new RegExp(`^${country}\\s*`, "g");
  return address.replace(regex, "");
};

export const weatherIcons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Atmosphere: "cloudy-gusts",
  Snow: "snowflake",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export const weatherTranslate = (weather) => {
  const translations = {
    Clear: "맑음",
    Clouds: "구름",
    Atmosphere: "안개",
    Snow: "눈",
    Rain: "비",
    Drizzle: "이슬비",
    Thunderstorm: "천둥번개",
  };

  return translations[weather] || weather;
};
