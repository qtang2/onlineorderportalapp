import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { globalStyles } from "../styles/global";
import ShopsPicker from "../shared/shopsPicker";
import Order from "../components/order";
import firebase from "../database/firebase";
import { SearchBar } from "react-native-elements";

class ManageOrders extends Component {
  constructor(props) {
    super(props);

    // console.log(props);
    this.state = {
      currentShopId: "",
      orders: [],
      dataFetched: false,
      arrayholder: [],
    };
  }
  search = () => {
    console.log("search pressed!!");
  };

  getAmount = (purchasedItems) => {
    // console.log(purchasedItems);

    var amount = 0.0;
    Object.keys(purchasedItems).forEach((itemCode) => {
      amount =
        amount +
        purchasedItems[itemCode].price * purchasedItems[itemCode].quatity;
    });
    return amount;
  };

  fetchOrdersData(shopId) {
    var rootRef = firebase.database().ref();
    var currentUserId = firebase.auth().currentUser.uid;
    var myOrdersRef = rootRef.child("myOrders");
    var ordersList = [];
    myOrdersRef
      .child(currentUserId)
      .child(shopId)
      .on("child_added", (snapshot) => {
        // console.log(snapshot.val());
        // console.log(snapshot.toJSON().purchasedItems);
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
        // console.log(this.state.orders);
        // console.log(ordersList.length);
      });
  }

  getCurrentShop = (shopId) => {
    this.setState({ currentShopId: shopId });
    this.fetchOrdersData(shopId);
  };

  render() {
    // console.log(this.state.orders);
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
        <View style={globalStyles.line}></View>
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
        {/* <FlatList
          keyExtractor={(order) => order.purchasedNo}
          data={this.state.orders}
          renderItem={({ item }) => {
            <Order
              purchasedNo={item.purchasedNo}
              purchasedItems={item.purchasedItems}
              deliverAddress={item.deliverAddress}
              orderDate={item.orderDate}
              requestDeliverDate={item.requestDeliverDate}
            />;
          }}
        /> */}

        <View style={styles.title}>
          <Text>Total 100 entires</Text>
        </View>
      </View>
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
