import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
} from "react-native";

export default class MyStatements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: null,
    };
  }

  componentDidMount() {
    fetch("https://fngp.com.au/KCWebApi/api/users/wei/OnlinePortal?password=")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <Text>My Statements</Text>
      </View>
    );
  }
}
