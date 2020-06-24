import React, { useState, Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View>
      {/* <Text>Loading...</Text> */}
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ECF0F1",
  },
});

export default Loading;
