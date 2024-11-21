import React from "react";
import { View } from "react-native";
import { WorkingProvider } from "./context/WorkingContext";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import styles from "./styles/AppStyles";

export default function App() {
  return (
    <WorkingProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Header />
        <Input />
        <List />
      </View>
    </WorkingProvider>
  );
}
