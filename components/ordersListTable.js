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

export default class OrdersListTable extends Component {
  constructor(props) {
    super(props);
    // console.log("prooooooooooops");
    // console.log(props);
    this.state = {
      tableHead: ["Order No.", "Status", "Amount", "Paid Date"],
      widthArr: [80, 80, 80, 80],
      tableData: [
        ["1rffffff", "2", "3", "4"],
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
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
      ],
    };
  }

  displayCell(cellData, cellIndex, index) {
    switch (cellIndex) {
      case 0:
        return (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("OrderDetails")}
          >
            <Text>{cellData}</Text>
          </TouchableOpacity>
        );
      default:
        return cellData;
    }
  }

  render() {
    const state = this.state;
    return (
      <ScrollView horizontal={true}>
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
              {state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={this.displayCell(cellData, cellIndex, index)}
                      textStyle={styles.text}
                      style={styles.cell}
                    />
                  ))}
                </TableWrapper>
              ))}
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
