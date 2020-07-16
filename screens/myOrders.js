import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { globalStyles } from "../styles/global";
import ShopsPicker from "../shared/shopsPicker";
import ConfirmButton from "../shared/confirmButton";
import ResetButton from "../shared/resetButton";
import OrderItem from "../components/orderItem";
import Item from "../components/item";
import firebase from "../database/firebase";

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentShopId: "",
      myItems: [],
      dataFetched: false,
      totalGST: 0.0,
      totalAmount: 0.0,
    };
  }

  componentDidMount() {
    console.log("hdhdhdhhdhd   " + this.state.currentShopId);
    // this.getCurrentShop(shopId);
  }

  confirmPressHandler = () => {
    // console.log("confirm pressed");
    this.props.navigation.navigate("ConfirmOrder");
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
          // console.log(snap.toJSON().category);
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
          // console.log(itemsList);
          this.setState({
            dataFetched: true,
            myItems: itemsList,
          });
          // console.log("set state data feteched");
          this.arrayholder = itemsList;
        });
      });
  }

  getCurrentShop = (shopId) => {
    this.setState({ currentShopId: shopId });
    // console.log("%%%%%%%%%%%%%%%%%%%%%%       " + shopId);
    this.fetchItemsData(shopId);
  };

  render() {
    // console.log(this.state.myItems);
    return (
      <View style={globalStyles.container}>
        <ShopsPicker
          onChange={(e) => {
            this.getCurrentShop(e);
          }}
        />

        <View style={globalStyles.line}></View>
        {/* <MyOrdersTable /> */}
        {/* <OrderItem itemCode="itemcodecode" /> */}
        <FlatList
          keyExtractor={(item) => item.itemCode}
          data={this.state.myItems}
          // style={{ borderWidth: 1 }}
          renderItem={({ item }) => (
            <OrderItem
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

        <View style={globalStyles.line}></View>
        <Text style={{ textAlign: "right" }}>
          Total GST ${this.state.totalGST} Total Amount {this.state.totalAmount}
        </Text>
        <View style={styles.btnsContainer}>
          <ResetButton text="Reset" />
          <ConfirmButton text="Confirm" onPress={this.confirmPressHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default MyOrders;
