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
    fetch(
      "https://fngp.com.au/KCWebApi/api/users/9e9986bc-3491-45ac-9a3e-93e501b09557/Customers"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          dataFetched: true,
          myShops: responseJson,
        });
        // console.log(this.state.myShops);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchShopsData();
  }

  shopsPickerItemsList = () => {
    return this.state.myShops.map((shop) => {
      return <Picker.Item label={shop.Text} key={shop.Id} value={shop.Id} />;
    });
  };

  updateCurrentValue = (shopId) => {
    this.setState({ selectedShop: shopId });
    this.props.onChange(shopId);
  };

  render() {
    return (
      <View style={styles.picker}>
        <Picker
          selectedValue={this.state.selectedShop}
          // onValueChange={(value) => this.setState({ selectedShop: value })}
          onValueChange={(shopId) => {
            this.updateCurrentValue(shopId);
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
