import React, { useState, Component } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../styles/global";
import MyOrdersTable from "../shared/myOrdersTable";
import ConfirmButton from "../shared/confirmButton";

export default class ConfirmOrder extends Component {
  submitPressHandler = () => {
    Alert.alert("Congratulations", "Submit Successfully!", [
      { text: "Understood", onPress: () => console.log("alert close") },
    ]);
  };
  render() {
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
        <View></View>
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
  },
  infoTextRight: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: "70%",
    height: 30,
    textAlign: "center",
    marginLeft: 20,
    fontSize: 13,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    width: "70%",
    height: 80,
    marginLeft: 20,
  },
});
