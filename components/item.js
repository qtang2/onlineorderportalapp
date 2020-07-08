import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function Item({
  itemName,
  price,
  itemImage,
  GST,
  category,
  isSelected,
  selectedClass,
}) {
  return (
    <View style={styles.itemRow}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/coffeecup.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.itemInfoContainer}>
        <Text>{itemName}</Text>
        <Text>
          $ {price}, GST: {GST}
        </Text>
      </View>
      {/* <View style={styles.cardContent}>{props.children}</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 3,
    marginLeft: 3,
  },
  itemInfoContainer: {
    flex: 3,
    flexDirection: "column",
    // borderBottomWidth: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    // borderWidth: 1,
    // borderBottomWidth: 1,
  },
  itemRow: {
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "#ffff",
    // shadowOffset: { height: 1, width: 1 },
    // shadowColor: "#333",
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    marginHorizontal: 2,
    marginVertical: 4,
    opacity: 0.8,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
});
