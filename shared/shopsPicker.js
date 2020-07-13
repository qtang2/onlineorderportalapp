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
      var shopObj = {
        shopId: snapshot.key,
        shopName: snapshot.toJSON().shopName,
      };
      shopsList.push(shopObj);
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
    return this.state.myShops.map((shop) => {
      return (
        <Picker.Item
          label={shop.shopName}
          key={shop.shopId}
          value={shop.shopName}
        />
      );
    });
  };

  updateCurrentValue = (shopName) => {
    this.setState({ selectedShop: shopName });
    // console.log("value changedddddddddddd&&&&&&&&&&&&&&&&&&&&&& " + shopName);
    // console.log(this.props.getCurrent);
    this.props.onChange(shopName);
  };

  render() {
    return (
      <View style={styles.picker}>
        <Picker
          selectedValue={this.state.selectedShop}
          // onValueChange={(value) => this.setState({ selectedShop: value })}
          onValueChange={(shopName) => {
            this.updateCurrentValue(shopName);
          }}
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
