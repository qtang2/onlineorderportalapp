import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "../database/firebase";
import { globalStyles } from "../styles/global";
import ShopsPicker from "../shared/shopsPicker";
import MyOrdersTable from "../shared/myOrdersTable";
import ConfirmButton from "../shared/confirmButton";
import ResetButton from "../shared/resetButton";

class MyOrders extends Component {
  state = { currentUser: null };
  logoutPressHandler = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("Login");
  };

  confirmPressHandler = () => {
    console.log("confirm pressed");
    this.props.navigation.navigate("ConfirmOrder");
  };

  render() {
    const { currentUser } = this.state;
    return (
      <View style={globalStyles.container}>
        <ShopsPicker />
        <View style={globalStyles.line}></View>
        <Text>Online Order</Text>
        <View style={globalStyles.line}></View>
        <MyOrdersTable />
        <View style={globalStyles.line}></View>
        <Text style={{ textAlign: "right" }}>
          Total GST $10 Total Amount $110{" "}
        </Text>
        <View style={styles.btnsContainer}>
          <ResetButton text="Reset" />
          <ConfirmButton text="Confirm" onPress={this.confirmPressHandler} />
        </View>
        <TouchableOpacity onPress={this.logoutPressHandler}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default MyOrders;
