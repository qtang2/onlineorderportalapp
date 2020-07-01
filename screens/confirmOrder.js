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
import MyOrdersTable from "../shared/myOrdersTable";

export default class ConfirmOrder extends Component {
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
        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfo}>
            <View style={styles.orderInfoLeft}>
              <Text style={styles.infoTextLeft}>Purchase No.</Text>
              <Text style={styles.infoTextLeft}>Order Date </Text>
              <Text style={styles.infoTextLeft}>Deliver To</Text>
              <Text style={styles.infoTextLeft}>Request Deliver Date</Text>
            </View>
            <View style={styles.orderInfoRight}>
              <Text style={styles.infoTextRight}> PN112345667</Text>
              <Text style={styles.infoTextRight}> 17-Jun-2019</Text>
              <Text style={styles.infoTextRight}> Address</Text>
              <Text style={styles.infoTextRight}> 17-Jun-2019</Text>
            </View>
          </View>
          <View style={styles.noteInfo}>
            <Text style={styles.infoTextLeft}>Note</Text>
            <TextInput multiline style={styles.noteInput} />
          </View>
        </View>

        <View style={globalStyles.line}></View>

        <View style={styles.tableContainer}>
          {/* //TODO: This should be order list */}
          <MyOrdersTable />
          {/* <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView>
                <Table borderStyle={{ borderWidth: 1, borderColor: "pink" }}>
                  <Rows data={state.tableData} widthArr={state.widthArr} />
                </Table>
              </ScrollView>
            </View>
          </ScrollView> */}
        </View>

        <View style={globalStyles.line}></View>
        <View style={styles.btnContainer}>
          <ConfirmButton text="Submit" onPress={this.submitPressHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderInfoContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  orderInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  orderInfoLeft: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  orderInfoRight: {
    flex: 1,
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
    width: 230,
    height: 90,
    marginLeft: 60,
  },
  tableContainer: {
    flex: 1,
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
