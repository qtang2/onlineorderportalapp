import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import firebase from "../database/firebase";

export default class Order extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      amount: 0.0,
      currentShopName: "",
    };
  }

  showOrderDetails = () => {
    this.props.navigation.navigate("OrderDetails", {
      purchasedNo: this.props.purchasedNo,
      purchasedItems: this.props.purchasedItems,
      orderDate: this.props.orderDate,
      requestDeliverDate: this.props.requestDeliverDate,
      deliverAddress: this.props.deliverAddress,
      amount: this.props.amount,
      currentShopId: this.props.currentShopId,
      note: this.props.note,
      // currentShopName: this.state.currentShopName,
    });
  };

  render() {
    return (
      <View style={styles.orderRow}>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            onPress={this.showOrderDetails} // Need to navigate to OrderDetails
          >
            <Text style={styles.leftItemPurchasedNoText}>
              {this.props.purchasedNo}
            </Text>
          </TouchableOpacity>

          <Text style={styles.leftItemText}>Amount: {this.props.amount}</Text>
          <Text style={styles.leftItemText}>Status: Close</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.itemText}>Order Date {this.props.orderDate}</Text>
          <Text style={styles.itemText}>
            Deliver Date {this.props.requestDeliverDate}
          </Text>
          <Text style={styles.itemText}>
            Invoice Date {this.props.requestDeliverDate}
          </Text>
          {/* <Text style={styles.itemText}>Paid Date</Text> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  leftItemText: {
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    alignSelf: "center",
    marginVertical: 5,
    // paddingVertical: 10,
  },
  itemText: {
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    // alignSelf: "center",
    marginVertical: 5,
    // paddingVertical: 10,
  },

  leftItemPurchasedNoText: {
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    alignSelf: "center",
    marginVertical: 5,
    color: "#1A82C3",
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
  orderRow: {
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
});
