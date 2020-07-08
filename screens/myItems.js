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
    console.log("#########");
    var currentUser = firebase.auth().currentUser;
    firebase
      .database()
      .ref("/myItems")
      .once("value", (snapshot) => {
        const itemsList = [];
        snapshot.forEach((child) => {
          var uid = child.toJSON().uid;
          var itemCode = child.toJSON().itemCode;
          if (currentUser.uid == uid) {
            console.log(uid);
          }

          // itemsList.push({
          //   itemCode: child.key,
          //   itemName: child.toJSON().itemName,
          //   itemImage: child.toJSON().itemImage,
          //   GST: child.toJSON().GST,
          //   category: child.toJSON().category,
          //   price: child.toJSON().price,
          //   // isSelected: false,
          //   // isSelectedClass: styles.list,
          // });
        });
      });
  };

  componentDidMount() {
    // var itemLst = [];
    this.fetchData;
  }

  render() {
    // console.log(this.state.items);
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
        <FlatList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "pink",
    marginHorizontal: 2,
    marginVertical: 4,
    opacity: 0.8,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 3,
    marginLeft: 3,
  },
  itemInfoContainer: {
    flex: 3,
    flexDirection: "column",
    // borderBottomWidth: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    // borderWidth: 1,
    // borderBottomWidth: 1,
  },
  itemRow: {
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "green",
    marginHorizontal: 2,
    marginVertical: 4,
    opacity: 0.8,
  },
  itemSelectedRow: {
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "yellow",
    marginHorizontal: 2,
    marginVertical: 4,
    opacity: 0.8,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
});
