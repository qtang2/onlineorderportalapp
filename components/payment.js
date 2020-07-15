import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function Payment({
  paymentId,
  allocatedAmount,
  createdBy,
  createdDate,
  note,
  paymentAmount,
  paymentMethod,
  status,
  transactionDate,
}) {
  return (
    <View style={styles.paymentRow}>
      <View style={styles.infoLeft}>
        <Text>No. {paymentId}</Text>
        <Text>Status: {status}</Text>
        <Text>Created By: {createdBy}</Text>
        <Text>Created Date: {createdDate}</Text>
      </View>
      <View style={styles.infoRight}>
        <Text>Amount: {paymentAmount}</Text>
        <Text>Allocated Amount: {allocatedAmount}</Text>
        <Text>Method: {paymentMethod}</Text>
        <Text>Tran Date: {transactionDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentRow: {
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "#ffff",
    // shadowOffset: { height: 1, width: 1 },
    // shadowColor: "#333",
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    marginHorizontal: 2,
    marginVertical: 4,
    opacity: 0.8,
  },
  infoLeft: {
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    flexDirection: "column",
    flex: 1,
  },
  infoRight: {
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    flexDirection: "column",
    flex: 1,
  },
});
