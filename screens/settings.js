import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "../database/firebase";

class Settings extends Component {
  logoutPressHandler = () => {
    console.log("setting log out");
    firebase.auth().signOut();
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <TouchableOpacity onPress={this.logoutPressHandler}>
        <Text>Log out</Text>
      </TouchableOpacity>
    );
  }
}

export default Settings;
