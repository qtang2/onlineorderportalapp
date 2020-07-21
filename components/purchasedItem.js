import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import firebase from "../database/firebase";
import { Icon } from "react-native-elements";

export default class PurchasedItem extends Component {
  constructor(props) {
    super(props);
    // console.log("orderitem propssssssssssssssssssss");
    // console.log(props);
    this.state = {
      quatity: this.props.quatity,
      amount: 0,
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.itemRow}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.leftContainer}>
          <Image
            source={require("../assets/coffeecup.png")}
            style={styles.image}
          />
          <Text style={styles.itemCodeText}>{this.props.itemCode}</Text>
          <Text style={styles.itemCodeText}>{this.props.CICode}</Text>
          <Text style={styles.itemCodeText}>{this.props.location}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.itemText}>{this.props.itemName}</Text>
          <Text style={styles.itemText}>
            Qty: {this.props.quatity} , $ {this.props.price}
          </Text>
          <Text style={styles.itemText}>
            Amount: {this.props.price * this.props.quatity} , GST:{" "}
            {this.props.GST * this.props.quatity}
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    flex: 0.3,
    // borderWidth: 1,
    alignSelf: "flex-end",
  },
  quatityContainer: {
    flexDirection: "row",
  },

  amountText: {
    flex: 3,
    marginHorizontal: 6,
  },
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
    flex: 1.3,
    flexDirection: "column",
  },
  leftContainer: {
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
