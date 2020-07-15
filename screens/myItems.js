import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  Alert,
  Image,
  Picker,
} from "react-native";
import firebase from "../database/firebase";
import { globalStyles } from "../styles/global";
import ShopsPicker from "../shared/shopsPicker";
import Search from "../shared/search";
import Item from "../components/item";
import { SearchBar } from "react-native-elements";

export default class MyItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      myItems: [],
      search: "",
      myShops: [],
      currentShopId: "",
    };
    this.arrayholder = [];
  }

  fetchData = () => {
    // console.log(this.state.selectedShop);
    var rootRef = firebase.database().ref();
    var currentUserId = firebase.auth().currentUser.uid;

    var myShopsRef = rootRef.child("myShops");
    var shopsList = [];

    // Get all the shops for the user
    myShopsRef.child(currentUserId).on("child_added", (snapshot) => {
      // console.log(snapshot.toJSON().shopName);
      var shopObj = {
        shopId: snapshot.key,
        shopName: snapshot.toJSON().shopName,
      };
      shopsList.push(shopObj);
      this.setState({
        // dataFetched: true,
        myShops: shopsList,
      });
    });
    var myItemsRef = rootRef.child("myItems");
    var itemsRef = rootRef.child("items");
    var itemsList = [];
    myItemsRef.child(currentUserId).on("child_added", (snapshot) => {
      let itemRef = itemsRef.child(snapshot.key);
      itemRef.on("value", (snap) => {
        var obj = {
          itemCode: snap.key,
          itemName: snap.toJSON().itemName,
          price: snap.toJSON().price,
          itemImage: snap.toJSON().itemImage,
          GST: snap.toJSON().GST,
          category: snap.toJSON().category,
          location:
            snapshot.toJSON().location == null
              ? "Empty"
              : snapshot.toJSON().location,
          CICode:
            snapshot.toJSON().CICode == null
              ? snap.key
              : snapshot.toJSON().CICode,
        };
        itemsList.push(obj);
        this.setState({
          dataFetched: true,
          myItems: itemsList,
        });
        this.arrayholder = itemsList;
      });
    });
  };

  componentDidMount() {
    // this.fetchData();
  }

  searchFilterFunction = (text) => {
    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.itemName.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ myItems: newData, search: text });
  };

  fetchItemsData(shopId) {
    // console.log("&&&&&&&&&&&&&&&   " + shopId);
    var rootRef = firebase.database().ref();
    var currentUserId = firebase.auth().currentUser.uid;
    var myItemsRef = rootRef.child("myItems");
    var itemsRef = rootRef.child("items");
    var itemsList = [];
    myItemsRef
      .child(currentUserId)
      .child(shopId)
      .on("child_added", (snapshot) => {
        let itemRef = itemsRef.child(snapshot.key);
        // console.log(snapshot.key);
        itemRef.on("value", (snap) => {
          var itemObj = {
            itemCode: snap.key,
            itemName: snap.toJSON().itemName,
            price: snap.toJSON().price,
            itemImage: snap.toJSON().itemImage,
            GST: snap.toJSON().GST,
            category: snap.toJSON().category,
            location:
              snapshot.toJSON().location == null
                ? "Empty"
                : snapshot.toJSON().location,
            CICode:
              snapshot.toJSON().CICode == null
                ? snap.key
                : snapshot.toJSON().CICode,
          };
          itemsList.push(itemObj);
          this.setState({
            dataFetched: true,
            myItems: itemsList,
          });
          this.arrayholder = itemsList;
        });
      });
  }

  getCurrentShop = (shopId) => {
    this.setState({ currentShopId: shopId });
    this.fetchItemsData(shopId);
  };

  getChangedCICode = (newCICode) => {
    console.log("changegedddddddddddddddddddddddddd   " + newCICode);
    //TODO: changed state to update the new CICode
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
          keyExtractor={(item) => item.itemCode}
          data={this.state.myItems}
          renderItem={({ item }) => (
            <Item
              itemCode={item.itemCode}
              itemName={item.itemName}
              price={item.price}
              itemImage={item.itemImage}
              GST={item.GST}
              category={item.category}
              location={item.location}
              CICode={item.CICode}
              onChangeCICode={(newCICode) => this.getChangedCICode(newCICode)}
            />
          )}
        />
      </View>
    );
  }
}
