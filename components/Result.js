import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { blue } from "../utils/colors";

export default function Result({ title, points, maxPoints }) {
  const percent = ((points / maxPoints) * 100).toFixed(2);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.result}>Your result is: {percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    color: blue
  },
  result: {
    fontSize: 20,
    color: blue
  }
});
