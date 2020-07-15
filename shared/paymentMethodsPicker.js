import React, { useState, Component } from "react";
import { StyleSheet, Picker, View, Text } from "react-native";

import firebase from "../database/firebase";

export default class PaymentMethodsPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPaymentMethod: "",
      dataFetched: false,
      paymentMethods: [],
    };
  }

  fetchPaymentMethodsData = () => {
    var rootRef = firebase.database().ref();
    var currentUserId = firebase.auth().currentUser.uid;
    var paymentMethodsRef = rootRef.child("paymentMethods");
    var methodsList = [];

    paymentMethodsRef.once("value", (snapshot) => {
      // console.log(snapshot.toJSON().shopName);
      // console.log(snapshot);
      snapshot.forEach((method) => {
        // console.log(method.toJSON().methodName);
        var methodObj = {
          methodId: method.key,
          methodName: method.toJSON().methodName,
        };
        methodsList.push(methodObj);
        this.setState({
          dataFetched: true,
          paymentMethods: methodsList,
        });
      });
    });
    // console.log(this.state.paymentMethods);
  };

  componentDidMount() {
    this.fetchPaymentMethodsData();
  }

  methodsPickerItemsList = () => {
    return this.state.paymentMethods.map((method) => {
      return (
        <Picker.Item
          label={method.methodName}
          key={method.methodId}
          value={method.methodName}
        />
      );
    });
  };

  updateCurrentValue = (paymentMethod) => {
    this.setState({ selectedPaymentMethod: paymentMethod });
    // console.log(
    //   "value changedddddddddddd&&&&&&&&&&&&&&&&&& " + paymentMethod
    // );
    // console.log(this.props.getCurrent);
    this.props.onChange(paymentMethod);
  };

  render() {
    // console.log(this.state.paymentMethods);
    return (
      <View style={styles.picker}>
        <Picker
          selectedValue={this.state.selectedPaymentMethod}
          onValueChange={(paymentMethod) => {
            this.updateCurrentValue(paymentMethod);
          }}
          mode="dropdown"
        >
          {this.methodsPickerItemsList()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    borderWidth: 1,
    height: "100%",
    borderColor: "#ddd",
  },
});
