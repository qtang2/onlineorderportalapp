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
import { Icon } from "react-native-elements";
import Invoice from "../screens/invoice";

export default class OrderDetails extends Component {
  constructor(props) {
    // super(props);
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

  viewInvoice = () => {
    this.props.navigation.navigate("Invoice");
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
          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Order No. </Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}> PN112345667</Text>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Order Date</Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}> 17-Jun-2019 </Text>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoInvoiceRowLeft}>
              <Text style={styles.infoTextLeft}>Invoice Date</Text>
            </View>

            <View style={styles.orderInfoInvoiceRowRight}>
              <View style={styles.invoiceInfo}>
                <Text style={styles.invoiceDateText}> 17-Jun-2019</Text>
                <Icon
                  name="visibility"
                  onPress={this.viewInvoice}
                  style={styles.invoiceViewIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Paid Date</Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}> 17-Jun-2019 </Text>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Status</Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}> Closed </Text>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}> Deliver To </Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}> Address 111 </Text>
            </View>
          </View>

          <View style={styles.orderInfoNoteRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}> Note </Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.noteInput}> note note note </Text>
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
  orderInfoRow: {
    flexDirection: "row",
    flex: 1,
  },
  orderInfoNoteRow: {
    flexDirection: "row",
    flex: 3,
  },
  orderInfoRowLeft: {
    flexDirection: "column",
    flex: 1.5,
    // borderWidth: 1,
    // borderColor: "green",
  },
  orderInfoRowRight: {
    flexDirection: "column",
    flex: 3,
    // borderWidth: 1,
    // borderColor: "pink",
    // alignItems: "center",
  },
  invoiceInfo: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderInfoInvoiceRowLeft: { flexDirection: "column", flex: 1.5 },
  orderInfoInvoiceRowRight: { flexDirection: "column", flex: 1.93 },
  invoiceDateText: {
    flex: 3.5,
    // alignSelf: "center",
    textAlign: "center",
    // borderWidth: 1,
  },
  invoiceViewIcon: {
    // borderWidth: 1,
    borderColor: "pink",
    flex: 0.5,
  },
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
  infoTextLeft: {
    textAlign: "center",
    fontSize: 15,
    // marginVertical: 7,
    alignSelf: "flex-start",
  },
  infoTextRight: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: 180,
    textAlign: "center",
    fontSize: 15,
    alignSelf: "flex-end",
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
    alignSelf: "flex-end",
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
