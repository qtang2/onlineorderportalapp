import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function Item({
  itemCode,
  itemName,
  price,
  itemImage,
  GST,
  category,
  CICode,
  location,
}) {
  return (
    <View style={styles.itemRow}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/coffeecup.png")}
          style={styles.image}
        />
        <Text style={styles.itemCodeText}>{itemCode}</Text>
      </View>
      <View style={styles.itemInfoContainer}>
        <Text style={styles.itemText}>{itemName}</Text>
        <Text style={styles.itemText}>
          $ {price}, GST: {GST}
        </Text>
        <Text style={styles.itemText}>C.I. Code: {CICode}</Text>
        <Text style={styles.itemText}>Location: {location}</Text>
      </View>
      {/* <View style={styles.cardContent}>{props.children}</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  itemText: {
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    // alignSelf: "center",
    marginVertical: 5,
    // paddingVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 3,
    marginLeft: 3,
  },
  itemCodeText: {
    alignSelf: "center",
  },
  itemInfoContainer: {
    flex: 3,
    flexDirection: "column",
    // marginVertical: 5,
    // paddingVertical: 5,
    // borderBottomWidth: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
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
