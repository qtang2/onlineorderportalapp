import React, { useState } from "react";
import { StyleSheet, Picker, View } from "react-native";

function ShopsPicker() {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <View style={styles.picker}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        mode="dropdown"
        itemStyle={styles.itemStyle}
      >
        <Picker.Item label="Shop111" value="shop111" />
        <Picker.Item label="Shop222" value="shop222" />
      </Picker>
    </View>
  );
}

export default ShopsPicker;

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    // borderWidth: 1,
  },
  itemStyle: {
    textAlign: "center",
  },
});
