import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
  },
});

export default styles;
