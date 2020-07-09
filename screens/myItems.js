import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  Alert,
  Image,
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
    };
    this.arrayholder = [];
  }

  fetchData = () => {
    var rootRef = firebase.database().ref();
    var currentUserId = firebase.auth().currentUser.uid;
    var myItemsRef = rootRef.child("myItems");
    var itemsRef = rootRef.child("items");
    var itemsList = [];

    myItemsRef.child(currentUserId).on("child_added", (snapshot) => {
      let itemRef = itemsRef.child(snapshot.key);
      itemRef.once("value", (snap) => {
        var obj = {
          itemCode: snap.key,
          itemName: snap.toJSON().itemName,
          price: snap.toJSON().price,
          itemImage: snap.toJSON().itemImage,
          GST: snap.toJSON().GST,
          category: snap.toJSON().category,
          location: snapshot.toJSON().location,
          CICode: snapshot.toJSON().CICode,
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
    this.fetchData();
  }

  searchFilterFunction = (text) => {
    // console.log("$$$$$$$$$$$$$$");
    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.itemName.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ myItems: newData, search: text });
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <ShopsPicker />
        {/* <View style={globalStyles.line}></View> */}

        <SearchBar
          placeholder="Type Here..."
          lightTheme
          onChangeText={(text) => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.search}
          containerStyle={globalStyles.searchBarContainer}
          inputContainerStyle={globalStyles.searchBarInputContainer}
        />
        {/* <View style={globalStyles.line}></View> */}
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
            />
          )}
        />
      </View>
    );
  }
}
