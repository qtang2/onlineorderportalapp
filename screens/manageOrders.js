import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { globalStyles } from "../styles/global";
import ShopsPicker from "../shared/shopsPicker";
import Order from "../components/order";
import firebase from "../database/firebase";
import { SearchBar } from "react-native-elements";

class ManageOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentShopId: "",
      orders: [],
      dataFetched: false,
      arrayholder: [],
      search: "",
    };
  }
  searchFilterFunction = (text) => {
    const newData = this.arrayholder.filter((order) => {
      const orderData = `${order.purchasedNo.toUpperCase()}`;
      const textData = text.toUpperCase();
      return orderData.indexOf(textData) > -1;
    });
    this.setState({ orders: newData, search: text });
  };

  getAmount(purchasedItems) {
    var amount = 0.0;
    // console.log("***************************************************");
    // console.log(purchasedItems);
    if (purchasedItems != null) {
      var itemsKeys = Object.keys(purchasedItems);
      itemsKeys.forEach((itemCode) => {
        amount =
          amount +
          purchasedItems[itemCode].price * purchasedItems[itemCode].quatity;
      });
      return amount;
    } else {
      console.log("amout is amount 0000000000000000");
    }
  }

  fetchOrdersData(shopId) {
    // console.log(shopId);
    var rootRef = firebase.database().ref();
    var currentUserId = firebase.auth().currentUser.uid;
    var myOrdersRef = rootRef.child("myOrders");
    var ordersList = [];
    myOrdersRef
      .child(currentUserId)
      .child(shopId)
      .on("child_added", (snapshot) => {
        if (snapshot.toJSON() != null) {
          console.log(snapshot.val());
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          console.log(snapshot.toJSON().purchasedItems);
          var orderObj = {
            deliverAddress:
              snapshot.toJSON().deliverAddress == ""
                ? "default Address"
                : snapshot.toJSON().deliverAddress,
            note:
              snapshot.toJSON().note == ""
                ? "Empty note"
                : snapshot.toJSON().note,
            orderDate: snapshot.toJSON().orderDate,
            requestDeliverDate: snapshot.toJSON().requestDeliverDate,
            purchasedItems: snapshot.toJSON().purchasedItems,
            purchasedNo: snapshot.key,
            amount: this.getAmount(snapshot.toJSON().purchasedItems),
          };
          ordersList.push(orderObj);
          this.setState({
            dataFetched: true,
            orders: ordersList,
          });
          this.arrayholder = ordersList;
        } else {
          console.log("emptyyyyyyyyyyyyyyyyyyy");
          this.setState({
            dataFetched: true,
            orders: [],
          });
        }
      });
  }

  getCurrentShop = (shopId) => {
    this.setState({ currentShopId: shopId });
    this.fetchOrdersData(shopId);
  };

  render() {
    // console.log(this.state.orders);
    return (
      <KeyboardAvoidingView
        style={globalStyles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
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
        {/* <View style={globalStyles.line}></View> */}
        <FlatList
          keyExtractor={(item) => item.purchasedNo}
          data={this.state.orders}
          // style={{ borderWidth: 1 }}
          renderItem={({ item }) => (
            <Order
              purchasedNo={item.purchasedNo}
              purchasedItems={item.purchasedItems}
              orderDate={item.orderDate}
              requestDeliverDate={item.requestDeliverDate}
              deliverAddress={item.deliverAddress}
              amount={item.amount}
              navigation={this.props.navigation}
              currentShopId={this.state.currentShopId}
              note={item.note}
            />
          )}
        />

        <View style={styles.title}>
          <Text>Total 100 entires</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default ManageOrders;

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
  },
  title: {
    flexDirection: "column",
    marginRight: 123,
  },
  searchContainer: {
    flexDirection: "column",
    // borderWidth: 1,
  },
});
