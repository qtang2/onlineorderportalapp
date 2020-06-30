import React, { useState, Component } from "react";
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
import ConfirmButton from "../shared/confirmButton";
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Rows,
} from "react-native-table-component";
import { globalStyles } from "../styles/global";

export default class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Img", "Qty", "Name", "Price", "Amount", "GST", "Total"],
      widthArr: [80, 80, 80, 80, 80, 80, 80],
      tableData: [
        ["1", "2", "3", "4", "2", "2", "0"],
        ["a", "b", "c", "d", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["a", "b", "c", "d", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["a", "b", "c", "d", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
        ["a", "b", "c", "d", "2", "2", "0"],
        ["1", "2", "3", "4", "2", "2", "0"],
      ],
    };
  }

  submitPressHandler = () => {
    Alert.alert("Congratulations", "Submit Successfully!", [
      { text: "Understood", onPress: () => console.log("alert close") },
    ]);
  };
  render() {
    const state = this.state;
    return (
      <View style={globalStyles.container}>
        <View style={styles.orderInfo}>
          <Text style={styles.infoTextLeft}>Purchase No.</Text>
          <Text style={styles.infoTextRight}> PN112345667</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.infoTextLeft}>Order Date </Text>
          <Text style={styles.infoTextRight}> 17-Jun-2019</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.infoTextLeft}>Deliver To</Text>
          <Text style={styles.infoTextRight}> Address</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.infoTextLeft}>Request Deliver Date</Text>
          <Text style={styles.infoTextRight}> 17-Jun-2019</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.infoTextLeft}>Note</Text>
          <TextInput multiline style={styles.noteInput} />
        </View>

        <View style={globalStyles.line}></View>
        {/* //TODO: this should be a table of product customer bought */}
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
                <Rows tableData={state.tableData} />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>

        <ConfirmButton text="Submit" onPress={this.submitPressHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderInfo: {
    flex: 1,
    flexDirection: "row",
  },
  infoTextLeft: {
    width: 70,
    height: 40,
    textAlign: "center",
    fontSize: 13,
    marginVertical: -5,
  },
  infoTextRight: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: "70%",
    height: 30,
    textAlign: "center",
    marginLeft: 20,
    fontSize: 13,
    marginVertical: -5,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    width: "70%",
    height: 80,
    marginLeft: 20,
  },
  text: { margin: 6 },
  row: {
    flexDirection: "row",
  },
  header: { height: 35, backgroundColor: "#1A82C3" },
});
