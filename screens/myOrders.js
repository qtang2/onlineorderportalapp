import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import ShopsPicker from "../shared/shopsPicker";
import MyOrdersTable from "../components/myOrdersTable";
import ConfirmButton from "../shared/confirmButton";
import ResetButton from "../shared/resetButton";

class MyOrders extends Component {
  state = { currentUser: null };

  confirmPressHandler = () => {
    console.log("confirm pressed");
    this.props.navigation.navigate("ConfirmOrder");
  };

  render() {
    return (
      <View style={globalStyles.container}>
        {/* <ShopsPicker /> */}
        <View style={globalStyles.line}></View>
        <Text style={{ fontSize: 16 }}>Online Order</Text>
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
