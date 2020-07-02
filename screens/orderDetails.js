import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import ConfirmButton from "../shared/confirmButton";
import { Table, Row, Rows } from "react-native-table-component";
import { globalStyles } from "../styles/global";
import MyOrdersTable from "../components/myOrdersTable";
import OrdersItemsTable from "../components/orderItemsTable";

export default class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Img", "Qty", "Name", "Price", "Amount", "GST", "Total"],
      widthArr: [80, 80, 80, 80, 80, 80, 80],
      tableData: [
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        [" ", " ", " ", "Total", "20", "20", "20"],
      ],
    };
  }

  submitPressHandler = () => {
    Alert.alert(" ", "Submit Successfully!", [
      {
        text: "Close",
        onPress: () => this.props.navigation.navigate("MyOrders"),
      },
    ]);
  };
  render() {
    const state = this.state;
    return (
      <View style={globalStyles.container}>
        <View style={styles.shop}>
          <Text style={styles.shopText}> Shop 111</Text>
          <View style={globalStyles.line}></View>
        </View>

        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfo}>
            <View style={styles.orderInfoLeft}>
              <Text style={styles.infoTextLeft}>Order No.</Text>
              <Text style={styles.infoTextLeft}>Order Date </Text>
              <Text style={styles.infoTextLeft}>Invoice Date</Text>
              <Text style={styles.infoTextLeft}>Paid Date</Text>
              <Text style={styles.infoTextLeft}>Status</Text>
              <Text style={styles.infoTextLeft}>Deliver To</Text>
            </View>
            <View style={styles.orderInfoRight}>
              <Text style={styles.infoTextRight}> PN112345667</Text>
              <Text style={styles.infoTextRight}> 17-Jun-2019</Text>
              <Text style={styles.infoTextRight}> 17-Jun-2019</Text>
              <Text style={styles.infoTextRight}> 17-Jun-2019</Text>
              <Text style={styles.infoTextRight}> Close</Text>
              <Text style={styles.infoTextRight}> Address</Text>
            </View>
          </View>
          <View style={styles.noteInfo}>
            <View style={styles.orderInfoLeft}>
              <Text style={styles.infoTextLeft}>Note</Text>
            </View>
            <View style={styles.orderInfoRight}>
              <TextInput multiline style={styles.noteInput} />
            </View>
          </View>
        </View>
        <View style={globalStyles.line}></View>
        <View style={styles.tableContainer}>
          <OrdersItemsTable />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shop: {
    flex: 0.5,
    flexDirection: "column",
  },
  shopText: {
    fontSize: 16,
    alignSelf: "center",
  },
  orderInfoContainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
  },
  orderInfo: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },

  orderInfoLeft: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  orderInfoRight: {
    flex: 2,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  infoTextLeft: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 7,
  },
  infoTextRight: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: 180,
    textAlign: "center",
    fontSize: 15,
    marginVertical: 6,
  },
  noteInfo: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginTop: 28,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    width: 250,
    height: 80,
  },
  tableContainer: {
    flex: 2,
  },
  text: { margin: 6 },
  row: {
    flexDirection: "row",
  },
  header: { height: 35, backgroundColor: "#1A82C3" },
  myOrderlist: {
    width: "100%",
    maxHeight: 100,
  },
  cfmButton: {
    alignItems: "center",
    backgroundColor: "pink",
  },
  btnContainer: {
    alignItems: "center",
  },
});
