import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { globalStyles } from "../styles/global";

export default class MyOrdersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Img", "Qty", "C.ICode", "Name", "Price", "Amount"],
      widthArr: [80, 80, 80, 80, 80, 80],
      tableData: [
        ["1", "2", "3", "4", "2", "0"],
        ["a", "b", "c", "d", "2", "0"],
        ["1", "2", "3", "4", "2", "0"],
        ["a", "b", "c", "d", "2", "0"],
        ["1", "2", "3", "4", "2", "0"],
        ["a", "b", "c", "d", "2", "0"],
        ["1", "2", "3", "4", "2", "0"],
        ["a", "b", "c", "d", "2", "0"],
        ["1", "2", "3", "4", "2", "0"],
        ["a", "b", "c", "d", "2", "0"],
        ["1", "2", "3", "4", "2", "0"],
        ["a", "b", "c", "d", "2", "0"],
        ["1", "2", "3", "4", "2", "0"],
        ["a", "b", "c", "d", "2", "0"],
        ["1", "2", "3", "4", "2", "0"],
        ["a", "b", "c", "d", "2", "0"],
        ["1", "2", "3", "4", "2", "0"],
        ["a", "b", "c", "d", "2", "0"],
        ["1", "2", "3", "4", "2", "0"],
        ["a", "b", "c", "d", "2", "0"],
      ],
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  displayCell(cellData, cellIndex, index) {
    switch (cellIndex) {
      case 0:
        return (
          <TouchableOpacity onPress={() => this._alertIndex(index)}>
            <Image
              source={require("../assets/coffeecup.png")}
              style={globalStyles.tableImage}
            />
          </TouchableOpacity>
        );
      case 1:
        return <TextInput style={globalStyles.qtyinput} />;
      default:
        return cellData;
    }
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <Image
          source={require("../assets/coffeecup.png")}
          style={globalStyles.tableImage}
        />
      </TouchableOpacity>
    );

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
            <Table>
              {state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={
                        this.displayCell(cellData, cellIndex, index)
                        // cellIndex === 0 ? element(cellData, index) : cellData
                      }
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
