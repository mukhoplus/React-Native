import { StyleSheet } from "react-native";
import { theme } from "../colors";

const styles = StyleSheet.create({
  todo: {
    backgroundColor: theme.grey,
    color: "white",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;
