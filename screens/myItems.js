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
      const itemData = `${item.Name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ myItems: newData, search: text });
  };

  fetchItemsData(shopId) {
    // console.log("&&&&&&&&&&&&&&&   " + shopId);
    var myItemsURL =
      "https://fngp.com.au/KCWebApi/api/productitems/" + shopId + "/MyProducts";
    fetch(myItemsURL)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson[0].ImageStr);
        this.setState({
          dataFetched: true,
          myItems: responseJson,
        });
        this.arrayholder = responseJson;
      })
      .catch((error) => {
        console.log(error);
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
          keyExtractor={(item) => item.CustomerPriceId}
          data={this.state.myItems}
          renderItem={({ item }) => (
            <Item
              itemId={item.CustomerPriceId}
              itemCode={item.Code}
              itemName={item.Name}
              price={item.CustomerPrice}
              itemImage={item.ImageStr}
              GST={item.GST}
              category={item.category}
              location={item.location}
              CICode={item.CustomerCode}
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
