import React, { useState, Component } from "react";
import { StyleSheet, Picker, View, Text } from "react-native";

import firebase from "../database/firebase";

export default class ShopsPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      myShops: [],
      selectedShop: "",
    };
  }

  fetchShopsData = () => {
    var rootRef = firebase.database().ref();
    var currentUserId = firebase.auth().currentUser.uid;
    var myShopsRef = rootRef.child("myShops");
    var shopsList = [];

    myShopsRef.child(currentUserId).on("child_added", (snapshot) => {
      // console.log(snapshot.toJSON().shopName);
      shopsList.push(snapshot.toJSON().shopName);
      this.setState({
        dataFetched: true,
        myShops: shopsList,
      });
    });
  };

  componentDidMount() {
    this.fetchShopsData();
  }

  shopsPickerItemsList = () => {
    return this.state.myShops.map((shop, i) => {
      return <Picker.Item label={shop} key={i} value={shop} />;
    });
  };
  render() {
    return (
      <View style={styles.picker}>
        <Picker
          selectedValue={this.state.selectedShop}
          onValueChange={(value) => this.setState({ selectedShop: value })}
          mode="dropdown"
        >
          {this.shopsPickerItemsList()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    // borderWidth: 1,
  },
  itemStyle: {
    textAlign: "center",
  },
});
