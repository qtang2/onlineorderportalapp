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
import { globalStyles } from "../styles/global";
import { SearchBar } from "react-native-elements";
import firebase from "../database/firebase";
import PaymentMethodsPicker from "../shared/paymentMethodsPicker";
import ResetButton from "../shared/resetButton";
import ShopsPicker from "../shared/shopsPicker";

export default class MyPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      myPayments: [],
      search: "",
      currentShopName: "",
      // myShops: [],
      // selectedShop: "",
    };
    this.arrayholder = []; // For search function
    // this.onChange = this.onChange.bind(this);
  }

  searchFilterFunction = (text) => {
    // const newData = this.arrayholder.filter((item) => {
    //   const itemData = `${item.itemName.toUpperCase()}`;
    //   const textData = text.toUpperCase();
    //   return itemData.indexOf(textData) > -1;
    // });
    // this.setState({ myItems: newData, search: text });
    console.log("payments search");
  };

  addNewPayment = () => {
    this.props.navigation.navigate("PaymentDetails", {
      currentShopName: this.state.currentShopName,
    });
    // console.log("current shop name   " + this.state.currentShopName);
  };

  getCurrentShop = (shopName) => {
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&& current pick  " + shopName);
    this.setState({ currentShopName: shopName });
    // console.log();
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <ShopsPicker
          onChange={(e) => {
            this.getCurrentShop(e);
          }}
        />
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          onChangeText={(text) => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.search}
          containerStyle={globalStyles.searchBarContainer}
          inputContainerStyle={globalStyles.searchBarInputContainer}
        />
        <FlatList
        // keyExtractor={(item) => item.itemCode}
        // data={this.state.myItems}
        // renderItem={({ item }) => (
        //   <Item
        //     itemCode={item.itemCode}
        //     itemName={item.itemName}
        //     price={item.price}
        //     itemImage={item.itemImage}
        //     GST={item.GST}
        //     category={item.category}
        //     location={item.location}
        //     CICode={item.CICode}
        //   />
        // )}
        />
        <ResetButton text="New" onPress={this.addNewPayment} />
      </View>
    );
  }
}
