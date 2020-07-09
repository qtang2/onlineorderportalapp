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
import ConfirmButton from "../shared/confirmButton";
import ResetButton from "../shared/resetButton";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class MyItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      myItems: [],
    };
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
        };
        itemsList.push(obj);
        this.setState({
          dataFetched: true,
          myItems: itemsList,
        });
      });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Text>My Items List</Text>
        <View style={globalStyles.line}></View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 3, alignItems: "flex-start" }}>
            <ShopsPicker />
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "flex-end",
              paddingTop: 10,
            }}
          >
            <Search />
          </View>
        </View>
        <View style={globalStyles.line}></View>
        <FlatList
          keyExtractor={(item) => item.itemCode}
          data={this.state.myItems}
          renderItem={({ item }) => (
            <Item
              itemName={item.itemName}
              price={item.price}
              itemImage={item.itemImage}
              GST={item.GST}
              category={item.category}
            />
          )}
        />
      </View>
    );
  }
}
