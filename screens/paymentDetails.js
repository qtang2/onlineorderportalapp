import React, { useState, Component } from "react";
import { StyleSheet, View, Text, Alert, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import PaymentMethodsPicker from "../shared/paymentMethodsPicker";
import ResetButton from "../shared/resetButton";
import firebase from "../database/firebase";

export default class PaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentNo: "",
      paymentAmount: "0.0",
      allocatedAmount: "$ 0.0",
      transactionDate: "",
      paymentMethod: "",
      status: "Open",
      note: "",
      currentShopId: props.route.params.currentShop.currentShopId,
      currentShopName: props.route.params.currentShop.currentShopName,
    };
  }
  componentDidMount() {
    this.createPaymentNo();
    this.createTransactionDate();
  }

  createPaymentNo = () => {
    var randomNo = Math.floor(Math.random() * 100);
    var paymentNo = "TR" + randomNo;
    this.setState({ paymentNo: paymentNo });
  };

  createTransactionDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var tranDate = date + "-" + month + "-" + year;
    this.setState({ transactionDate: tranDate });
  };

  savePressHandler = () => {
    var currentUser = firebase.auth().currentUser;
    if (currentUser) {
      // console.log(this.state);
      firebase
        .database()
        .ref("/myPayments")
        .child(currentUser.uid)
        .child(this.state.currentShopId)
        .child(this.state.paymentNo)
        .set({
          allocatedAmount: this.state.allocatedAmount,
          note: this.state.note,
          paymentAmount: this.state.paymentAmount,
          paymentMethod: this.state.paymentMethod,
          status: this.state.status,
          transactionDate: this.state.transactionDate,
        });
    } else {
      console.log("no such a user");
    }
    Alert.alert(" ", "Payment Saved!", [
      {
        text: "Close",
        onPress: () => this.props.navigation.navigate("MyPayments"),
      },
    ]);
  };

  getCurrentPaymentMethod = (currentMethod) => {
    this.setState({ paymentMethod: currentMethod });
    // console.log("Methoddddddddddd    " + currentMethod);
  };

  render() {
    // const state = this.state;
    // console.log(this.state);
    return (
      <View style={globalStyles.container}>
        <View style={styles.shop}>
          <Text style={styles.shopText}>{this.state.currentShopName}</Text>
        </View>
        <View style={globalStyles.line}></View>

        <View style={styles.paymentInfoContainer}>
          <View style={styles.paymentInfoRow}>
            <View style={styles.paymentInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Payment No. </Text>
            </View>

            <View style={styles.paymentInfoRowRight}>
              <Text style={styles.infoTextRight}>{this.state.paymentNo}</Text>
            </View>
          </View>

          <View style={styles.paymentInfoRow}>
            <View style={styles.paymentInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Payment Amount</Text>
            </View>

            <View style={styles.paymentInfoRowRight}>
              <TextInput
                placeholder="0.0"
                value={this.state.paymentAmount}
                onChangeText={(paymentAmount) =>
                  this.setState({ paymentAmount })
                }
                style={styles.infoTextRight}
              />
            </View>
          </View>

          <View style={styles.paymentInfoRow}>
            <View style={styles.paymentInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Allocated Amount</Text>
            </View>

            <View style={styles.paymentInfoRowRight}>
              <Text style={styles.infoTextRight}>
                {this.state.allocatedAmount}{" "}
              </Text>
            </View>
          </View>

          <View style={styles.paymentInfoRow}>
            <View style={styles.paymentInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Transaction Date</Text>
            </View>

            <View style={styles.paymentInfoRowRight}>
              <Text style={styles.infoTextRight}>
                {this.state.transactionDate}
              </Text>
            </View>
          </View>

          <View style={styles.paymentInfoRow}>
            <View style={styles.paymentInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Payment Method</Text>
            </View>

            <View style={styles.paymentInfoRowRight}>
              <View style={styles.methodsPicker}>
                <PaymentMethodsPicker
                  onChange={(e) => {
                    this.getCurrentPaymentMethod(e);
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.paymentInfoRow}>
            <View style={styles.paymentInfoRowLeft}>
              <Text style={styles.infoTextLeft}> Status </Text>
            </View>

            <View style={styles.paymentInfoRowRight}>
              <Text style={styles.infoTextRight}>{this.state.status}</Text>
            </View>
          </View>

          <View style={styles.paymentInfoNoteRow}>
            <View style={styles.paymentInfoRowLeft}>
              <Text style={styles.infoTextLeft}> Note </Text>
            </View>

            <View style={styles.paymentInfoRowRight}>
              <TextInput
                style={styles.noteInput}
                multiline
                value={this.state.note}
                onChangeText={(note) => this.setState({ note })}
              />
            </View>
          </View>
        </View>

        <ResetButton text="Save" onPress={this.savePressHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  methodsPicker: {
    // flexDirection: "column",
    // flex: 2,
    // backgroundColor: "pink",
    height: 40,
  },
  paymentInfoRow: {
    flexDirection: "row",
    flex: 1,
  },
  paymentInfoNoteRow: {
    flexDirection: "row",
    flex: 3,
  },
  paymentInfoRowLeft: {
    flexDirection: "column",
    flex: 2,
    // borderWidth: 1,
    // borderColor: "green",
  },
  paymentInfoRowRight: {
    flexDirection: "column",
    flex: 3,
    // borderWidth: 1,
    // borderColor: "pink",
    // alignItems: "center",
  },
  shop: {
    flexDirection: "column",
    // borderWidth: 1,
  },
  shopText: {
    fontSize: 16,
    alignSelf: "center",
  },
  paymentInfoContainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    // borderWidth: 1,
  },
  infoTextLeft: {
    textAlign: "center",
    fontSize: 14,
    // marginVertical: 7,
    alignSelf: "flex-start",
  },
  infoTextRight: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    alignSelf: "flex-end",
    // backgroundColor: "pink",
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
});
