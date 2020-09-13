import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { purple, white } from "../utils/colors";

function EnabledButton({
  children,
  onPress,
  buttonStyle = {},
  textStyle = {}
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, buttonStyle]}>
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

function DisabledButton({ children }) {
  return (
    <View style={[styles.button, styles.disabledButton]}>
      <Text style={[styles.text, styles.disabledText]}>{children}</Text>
    </View>
  );
}

export default function TextButton({
  children,
  onPress,
  buttonStyle = {},
  textStyle = {},
  disabled = false
}) {
  return disabled ? (
    <DisabledButton>{children}</DisabledButton>
  ) : (
    <EnabledButton
      onPress={onPress}
      buttonStyle={buttonStyle}
      textStyle={textStyle}
    >
      {children}
    </EnabledButton>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: white,
    fontSize: 20
  },
  button: {
    backgroundColor: purple,
    borderRadius: 7,
    margin: 10,
    padding: 7
  },
  disabledButton: {
    backgroundColor: "#AAA"
  },
  disabledText: {
    color: "#555"
  }
});
