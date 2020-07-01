import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";

function Search({ onPress }) {
  return (
    <View style={styles.searchContiner}>
      <TextInput style={styles.searchInput} />
      <TouchableOpacity onPress={onPress}>
        <Icon name="search" onPress={onPress} />
      </TouchableOpacity>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  searchContiner: {
    flexDirection: "row",
  },
  searchInput: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#d4d4d9",
    width: 80,
    height: 30,
    marginRight: 10,
  },
});
