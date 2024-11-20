import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
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
    marginBottom: 10,
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

export default styles;
