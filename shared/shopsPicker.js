import React, { useState } from "react";
import { StyleSheet, Picker } from "react-native";

function ShopsPicker() {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <Picker
      selectedValue={selectedValue}
      style={styles.picker}
      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      mode="dropdown"
      itemStyle={styles.itemStyle}
    >
      <Picker.Item label="Shop111" value="shop111" />
      <Picker.Item label="Shop222" value="shop222s" />
    </Picker>
  );
}

export default ShopsPicker;

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    paddingBottom: 10,
  },
  itemStyle: {
    textAlign: "center",
  },
});
