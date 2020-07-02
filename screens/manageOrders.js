import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import Search from "../shared/search";
import ShopsPicker from "../shared/shopsPicker";
import MyOrdersTable from "../components/myOrdersTable";
import OrdersListTable from "../components/ordersListTable";

class ManageOrders extends Component {
  search = () => {
    console.log("search pressed!!");
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <ShopsPicker />
        <View style={globalStyles.line}></View>
        <View style={styles.head}>
          <View style={styles.title}>
            <Text style={{ fontSize: 16 }}> Order List</Text>
          </View>
          <View style={styles.searchContainer}>
            <Search onPress={this.search} />
          </View>
        </View>

        <View style={globalStyles.line}></View>
        <OrdersListTable navigation={this.props.navigation} />
        <View style={globalStyles.line}></View>
        <View style={styles.title}>
          <Text>Total 100 entires</Text>
        </View>
      </View>
    );
  }
}
export default ManageOrders;

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
  },
  title: {
    flexDirection: "column",
    marginRight: 123,
  },
  searchContainer: {
    flexDirection: "column",
    // borderWidth: 1,
  },
});
