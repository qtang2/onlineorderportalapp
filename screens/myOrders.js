import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { globalStyles } from "../styles/global";
import ShopsPicker from "../shared/shopsPicker";
import ConfirmButton from "../shared/confirmButton";
import ResetButton from "../shared/resetButton";
import OrderItem from "../components/orderItem";
import firebase from "../database/firebase";

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentShopId: "",
      orderItems: [],
      dataFetched: false,
      totalGST: 0.0,
      totalAmount: 0.0,
    };
  }

  componentDidMount() {
    // console.log("hdhdhdhhdhd shopdid  " + this.state.currentShopId);
    // this.getCurrentShop(shopId);
  }

  creatAnOrder(shopObj) {
    var purchasedItems = [];
    var randomNo = Math.floor(Math.random() * 100);
    var purchasedNo = "PN" + randomNo;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var orderDate = date + "-" + month + "-" + year;

    this.state.orderItems.forEach((orderItem) => {
      if (orderItem.quatity != 0) {
        purchasedItems.push(orderItem);
      }
    });
    if (purchasedItems.length != 0) {
      // console.log(purchasedItems);
      this.props.navigation.navigate("ConfirmOrder", {
        purchasedItems: purchasedItems,
        purchasedNo: purchasedNo,
        orderDate: orderDate,
        currentShop: shopObj,
      });
    } else {
      alert("No items selected");
    }
  }

  confirmPressHandler = () => {
    // console.log("confirm pressed   " + this.state.currentShopId);
    var currentUser = firebase.auth().currentUser;
    var shopObj = {};
    if (currentUser) {
      firebase
        .database()
        .ref("/shops")
        .child(this.state.currentShopId)
        .once("value", (snapshot) => {
          var currentShopName = snapshot.toJSON().shopName;
          shopObj = {
            currentShopId: this.state.currentShopId,
            currentShopName: currentShopName,
          };
          // console.log(shopObj);
          this.creatAnOrder(shopObj);
        });
    } else {
      console.log("no such a user");
    }
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
            quatity: 0,
          };
          itemsList.push(itemObj);
          // console.log(itemsList);
          this.setState({
            dataFetched: true,
            orderItems: itemsList,
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

  //TODO: need to figure out how to clear input after press reset button
  resetQuatity = () => {
    var items = this.state.orderItems;
    items.forEach((orderItem) => {
      orderItem.quatity = 0.0;
      this.setState({ orderItems: items, totalGST: 0.0, totalAmount: 0.0 });
    });
  };

  changeQuatity = (itemCode, quatity, price, GST) => {
    console.log("changegggggg");
    var items = this.state.orderItems;

    items.forEach((orderItem) => {
      // console.log(orderItem.itemCode);
      if (orderItem.itemCode == itemCode) {
        orderItem.quatity = quatity;
      }

      this.setState({
        orderItems: items,
        totalAmount: this.state.totalAmount + quatity * price,
        totalGST: this.state.totalGST + quatity * GST,
      });
    });
  };

  render() {
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
        <View style={globalStyles.line}></View>
        <FlatList
          keyExtractor={(item) => item.itemCode}
          data={this.state.orderItems}
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
              quatity={item.quatity}
              onChangeQuatity={this.changeQuatity}
              // onReset = {this.resetQuatity}
            />
          )}
        />

        <View style={globalStyles.line}></View>
        <Text style={{ textAlign: "right" }}>
          Total GST ${this.state.totalGST} Total Amount {this.state.totalAmount}
        </Text>
        <View style={styles.btnsContainer}>
          <ResetButton text="Reset" onPress={this.resetQuatity} />
          <ConfirmButton text="Confirm" onPress={this.confirmPressHandler} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  icon: {
    flex: 0.3,
    // borderWidth: 1,
    alignSelf: "flex-end",
  },
  quatityContainer: {
    flexDirection: "row",
  },
  input: {
    flex: 1.5,
    borderWidth: 1,
    borderRadius: 2,
    // marginHorizontal: 10,
    borderColor: "grey",
  },
  amountText: {
    flex: 3,
    marginHorizontal: 6,
  },
  buttonText: {
    color: "#F1FFEF",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  itemText: {
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    // alignSelf: "center",
    marginVertical: 5,
    // paddingVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 3,
    marginLeft: 3,
  },
  itemCodeText: {
    alignSelf: "center",
  },
  rightContainer: {
    flex: 1.3,
    flexDirection: "column",
  },
  leftContainer: {
    flex: 1,
    flexDirection: "column",
    // borderWidth: 1,
    // borderBottomWidth: 1,
  },
  itemRow: {
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "#ffffff",
    marginHorizontal: 2,
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
    opacity: 0.8,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
});

export default MyOrders;
