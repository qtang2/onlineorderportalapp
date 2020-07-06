import React, { useState, Component } from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import firebase from "../database/firebase";
import { globalStyles } from "../styles/global";
import ShopsPicker from "../shared/shopsPicker";
import Search from "../shared/search";

export default class AddItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      items: [],
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("/items")
      .on("value", (snapshot) => {
        const itemsList = [];
        snapshot.forEach((child) => {
          itemsList.push({
            itemCode: child.key,
            itemName: child.toJSON().itemName,
            itemImage: child.toJSON().itemImage,
            GST: child.toJSON().GST,
            category: child.toJSON().category,
            price: child.toJSON().price,
          });
        });
        this.setState({
          dataFetched: true,
          items: itemsList,
        });
      });
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Text>Items List</Text>
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
        <FlatList
          keyExtractor={(item) => item.itemCode}
          data={this.state.items}
          renderItem={({ item }) => <Text>{item.itemName}</Text>}
          style={{ borderWidth: 1, backgroundColor: "pink" }}
        />

        {/* <Button title="getItems" onPress={this.readItemsData} /> */}
      </View>
    );
  }
}
