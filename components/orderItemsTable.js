import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Rows,
} from "react-native-table-component";
import { globalStyles } from "../styles/global";

export default class OrdersItemsTable extends Component {
  constructor(props) {
    super(props);
    // console.log("prooooooooooops");
    // console.log(props);
    this.state = {
      tableHead: ["Customer Code", "C.ICode", "Name", "Order/Deliver Qty"],
      widthArr: [80, 80, 80, 80],
      tableData: [
        ["dddd", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
      ],
    };
  }

  render() {
    const state = this.state;
    return (
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={globalStyles.tableBorder}>
            <Row
              data={state.tableHead}
              widthArr={state.widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView>
            <Table borderStyle={globalStyles.tableBorder}>
              <Rows data={state.tableData} widthArr={state.widthArr} />
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: { margin: 6 },
  row: {
    flexDirection: "row",
  },
  btnText: { textAlign: "center", color: "#fff" },
  header: { height: 35, backgroundColor: "#1A82C3" },
  cell: { width: 80 },
});
