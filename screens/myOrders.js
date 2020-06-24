import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import firebase from "firebase";

class MyOrders extends Component {
  logoutPressHandler = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <View>
        <Text>My Orders</Text>
        <Button title="confirm" />
        <TouchableOpacity onPress={this.logoutPressHandler}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MyOrders;
