import React, { Component } from "react";
import { View, FlatList } from "react-native";
import firebase from "../database/firebase";
import { globalStyles } from "../styles/global";
import ShopsPicker from "../shared/shopsPicker";
import Item from "../components/item";
import { SearchBar } from "react-native-elements";

export default class MyItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      myItems: [],
      search: "",
      currentShopId: "",
    };
    this.arrayholder = [];
  }

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
    // console.log("#########################       " + shopId);
    this.fetchItemsData(shopId);
  };

  updateItemsData = (newCICode) => {
    this.fetchItemsData(this.state.currentShopId);
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
              currentShopId={this.state.currentShopId}
              onChangeCICode={(newCICode) => this.updateItemsData(newCICode)}
              onChangeLocation={(newLocation) =>
                this.updateItemsData(newLocation)
              }
            />
          )}
        />
      </View>
    );
  }
}
