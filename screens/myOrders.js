import React, { Component } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import firebase from "../database/firebase";
import { globalStyles } from "../styles/global";
import ShopsPicker from "../shared/shopsPicker";

class MyOrders extends Component {
  state = { currentUser: null };
  logoutPressHandler = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("Login");
  };
  render() {
    const { currentUser } = this.state;
    return (
      <View style={globalStyles.container}>
        <ShopsPicker />
        <View style={globalStyles.line}></View>
        <Text>My Orders</Text>
        <Text>Hi, {currentUser && currentUser.email}</Text>
        <Button title="confirm" />
        <TouchableOpacity onPress={this.logoutPressHandler}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MyOrders;
