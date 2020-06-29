import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function ResetButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cfmButton}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#F1FFEF",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  cfmButton: {
    borderRadius: 3,
    backgroundColor: "#1A82C3",
    marginRight: 10,
    width: 80,
    height: 30,
  },
});
