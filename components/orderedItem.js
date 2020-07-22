import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import firebase from "../database/firebase";
import { Icon } from "react-native-elements";

export default class OrderedItem extends Component {
  constructor(props) {
    super(props);
    console.log("ordereditem propssssssssssssssssssss");
    console.log(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.itemRow}>
        <View style={styles.leftContainer}>
          <Image
            source={require("../assets/coffeecup.png")}
            style={styles.image}
          />
          <Text style={styles.itemCodeText}>
            CICode: {this.props.itemCICode}
          </Text>
          <Text style={styles.itemCodeText}>Code: {this.props.itemCode}</Text>
          <Text style={styles.itemCodeText}>{this.props.itemName}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.itemText}>
            price {this.props.price} , GST {this.props.GST}
          </Text>
          <Text style={styles.itemText}>Qty: {this.props.quatity}</Text>
          <Text style={styles.itemText}>
            Delivered Qty: {this.props.deliveredQuatity} ,
          </Text>
          <Text style={styles.itemText}>Amount: {this.props.amount}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#F1FFEF",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
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
  rightContainer: {
    flex: 1,
    flexDirection: "column",
  },
  leftContainer: {
    flex: 1.5,
    flexDirection: "column",
    // borderWidth: 1,
    // borderBottomWidth: 1,
  },
  itemRow: {
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "#ffffff",
    marginHorizontal: 2,
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
    opacity: 0.8,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
});
