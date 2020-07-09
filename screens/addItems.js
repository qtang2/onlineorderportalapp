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

export default class AddItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      items: [],
      isSelectedItem: null,
    };
  }

  componentDidMount() {
    // var itemLst = [];
    firebase
      .database()
      .ref("/items")
      .once("value", (snapshot) => {
        const itemsList = [];
        snapshot.forEach((child) => {
          itemsList.push({
            itemCode: child.key,
            itemName: child.toJSON().itemName,
            itemImage: child.toJSON().itemImage,
            GST: child.toJSON().GST,
            category: child.toJSON().category,
            price: child.toJSON().price,
            //add two more props for selection
            isSelected: false,
            // isSelectedClass: styles.list,
          });
        });
        this.setState({
          dataFetched: true,
          items: itemsList,
        });
      });
  }

  selectionHandler = (itemCode) => {
    let renderItems = [...this.state.items];
    for (let item of renderItems) {
      if (item.itemCode == itemCode) {
        item.isSelected = !item.isSelected;
        break;
      }
    }
    this.setState({ renderItems });
  };

  resetSelections = () => {
    let renderItems = [...this.state.items];
    for (let item of renderItems) {
      item.isSelected = false;
    }
    this.setState({ renderItems });
  };

  //TODO: need to handle repeated selections
  addSelections = () => {
    var currentUser = firebase.auth().currentUser;
    if (currentUser) {
      let renderItems = [...this.state.items];
      for (let item of renderItems) {
        if (item.isSelected == true) {
          firebase
            .database()
            .ref("/myItems")
            .child(currentUser.uid)
            .child(item.itemCode)
            .set({
              itemName: item.itemName,
            });

          console.log("adddddddd " + item.itemCode);
        }
        alert("Add successfully!");
      }
    } else {
      console.log("no such a user");
    }
  };

  render() {
    // console.log("$$$$$$$$$$$**********************");
    // console.log(this.state.items);
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
        <View style={globalStyles.line}></View>
        <FlatList
          keyExtractor={(item) => item.itemCode}
          data={this.state.items}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={
                  item.isSelected == true
                    ? {
                        flexDirection: "row",
                        borderRadius: 6,
                        borderWidth: 1,
                        elevation: 3,
                        backgroundColor: "pink",
                        marginHorizontal: 2,
                        marginVertical: 4,
                        opacity: 0.7,
                      }
                    : {
                        flexDirection: "row",
                        borderRadius: 6,
                        borderWidth: 1,
                        elevation: 3,
                        backgroundColor: "#ffff",
                        marginHorizontal: 2,
                        marginVertical: 4,
                        opacity: 0.8,
                      }
                }
                onPress={() => this.selectionHandler(item.itemCode)}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../assets/coffeecup.png")}
                    style={styles.image}
                  />
                </View>
                <View style={styles.itemInfoContainer}>
                  <Text>{item.itemName}</Text>
                  <Text>
                    $ {item.price}, GST: ${item.GST}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            borderWidth: 1,
          }}
        >
          <ResetButton text="Reset" onPress={this.resetSelections} />
          <ConfirmButton text="Add" onPress={this.addSelections} />
        </View>
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
