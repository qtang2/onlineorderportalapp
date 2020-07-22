import React, { Component } from "react";
import { StyleSheet, View, Text, Alert, Image, FlatList } from "react-native";
import { globalStyles } from "../styles/global";
import { Icon } from "react-native-elements";

import firebase from "../database/firebase";
import OrderedItem from "../components/orderedItem";

export default class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasedNo: this.props.route.params.purchasedNo,
      purchasedItems: this.props.route.params.purchasedItems,
      orderDate: this.props.route.params.orderDate,
      requestDeliverDate: this.props.route.params.requestDeliverDate,
      deliverAddress: this.props.route.params.deliverAddress,
      amount: this.props.route.params.amount,
      currentShopId: this.props.route.params.currentShopId,
      note: this.props.route.params.note,
      status: "Closed",

      itemsWithInfo: [],
      currentShopName: "",
      // currentShopName: this.props.route.params.currentShopName,
    };
  }

  submitPressHandler = () => {
    Alert.alert(" ", "Submit Successfully!", [
      {
        text: "Close",
        onPress: () => this.props.navigation.navigate("MyOrders"),
      },
    ]);
  };

  viewInvoice = () => {
    this.props.navigation.navigate("Invoice");
  };

  getShopName(shopId) {
    var shopName = "";
    firebase
      .database()
      .ref("/shops")
      .child(shopId)
      .once("value", (snapshot) => {
        shopName = snapshot.toJSON().shopName;
        this.setState({ currentShopName: shopName });
      });
  }

  componentDidMount() {
    this.getAllItemsInfo();
    this.getShopName(this.state.currentShopId);
  }

  getAllItemsInfo() {
    var itemsKeys = Object.keys(this.state.purchasedItems);

    var itemsWithInfoList = [];
    itemsKeys.forEach((itemCode) => {
      var currentUserId = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref("/myItems")
        .child(currentUserId)
        .child(this.state.currentShopId)
        .child(itemCode)
        .once("value", (snapshot) => {
          // console.log(snapshot.val());
          var CICode = snapshot.toJSON().CICode;
          firebase
            .database()
            .ref("items")
            .child(itemCode)
            .once("value", (snap) => {
              var orderedItem = {
                itemCICode: snapshot.toJSON().CICode,
                itemCode: itemCode,
                itemName: snap.toJSON().itemName,
                GST: snap.toJSON().GST,
                itemImage: snap.toJSON().itemImage,
                price: this.state.purchasedItems[itemCode]["price"],
                quatity: this.state.purchasedItems[itemCode]["quatity"],
                deliveredQuatity: this.state.purchasedItems[itemCode][
                  "quatity"
                ], // TODO: need to figure out when this quatity happened
                amount:
                  this.state.purchasedItems[itemCode]["price"] *
                  this.state.purchasedItems[itemCode]["quatity"],
              };
              itemsWithInfoList.push(orderedItem);
              this.setState({ itemsWithInfo: itemsWithInfoList });
            });
        });
    });
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={styles.shopText}>{this.state.currentShopName}</Text>
        <View style={globalStyles.line}></View>

        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Order No. </Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}>
                {" "}
                {this.state.purchasedNo}
              </Text>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Order Date</Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}>{this.state.orderDate}</Text>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Delivery Date</Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}>
                {this.state.requestDeliverDate}
              </Text>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoInvoiceRowLeft}>
              <Text style={styles.infoTextLeft}>Invoice Date</Text>
            </View>

            <View style={styles.orderInfoInvoiceRowRight}>
              <View style={styles.invoiceInfo}>
                <Text style={styles.invoiceDateText}>
                  {" "}
                  {this.state.requestDeliverDate}
                </Text>
                <Icon
                  name="visibility"
                  onPress={this.viewInvoice}
                  style={styles.invoiceViewIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Paid Date</Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}>
                {" "}
                {this.state.requestDeliverDate}{" "}
              </Text>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Status</Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}> {this.state.status} </Text>
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}> Deliver To </Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}>
                {" "}
                {this.state.deliverAddress}{" "}
              </Text>
            </View>
          </View>

          <View style={styles.orderInfoNoteRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}> Note </Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.noteInput}> {this.state.note} </Text>
            </View>
          </View>
        </View>

        <Text> Ordered Items</Text>

        <FlatList
          style={styles.flatlist}
          keyExtractor={(item) => item.itemCode}
          data={this.state.itemsWithInfo}
          // style={{ borderWidth: 1 }}
          renderItem={({ item }) => (
            <OrderedItem
              image={item.itemImage}
              itemCICode={item.itemCICode}
              itemCode={item.itemCode}
              itemName={item.itemName}
              price={item.price}
              GST={item.GST}
              quatity={item.quatity}
              deliveredQuatity={item.deliveredQuatity}
              amount={item.amount}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shop: {
    flex: 0.5,
    flexDirection: "column",
    // borderWidth: 1,
  },
  orderInfoContainer: {
    flex: 1.3,
    flexDirection: "column",
    alignItems: "center",
    // borderWidth: 1,
  },
  flatlist: {
    flex: 4,
    // borderWidth: 1,
  },
  orderInfoRow: {
    flexDirection: "row",
    flex: 1,
  },
  orderInfoNoteRow: {
    flexDirection: "row",
    flex: 3,
  },
  orderInfoRowLeft: {
    flexDirection: "column",
    flex: 1.5,
    // borderWidth: 1,
    // borderColor: "green",
  },
  orderInfoRowRight: {
    flexDirection: "column",
    flex: 3,
    // borderWidth: 1,
    // borderColor: "pink",
    // alignItems: "center",
  },
  invoiceInfo: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderInfoInvoiceRowLeft: { flexDirection: "column", flex: 1.5 },
  orderInfoInvoiceRowRight: { flexDirection: "column", flex: 1.93 },
  invoiceDateText: {
    flex: 3.5,
    // alignSelf: "center",
    textAlign: "center",
    // borderWidth: 1,
  },
  invoiceViewIcon: {
    // borderWidth: 1,
    borderColor: "pink",
    flex: 0.5,
  },

  shopText: {
    fontSize: 16,
    alignSelf: "center",
  },

  orderInfo: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  infoTextLeft: {
    textAlign: "center",
    fontSize: 15,
    // marginVertical: 7,
    alignSelf: "flex-start",
  },
  infoTextRight: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: 180,
    textAlign: "center",
    fontSize: 15,
    alignSelf: "flex-end",
  },
  noteInfo: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginTop: 28,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    width: 250,
    height: 80,
    alignSelf: "flex-end",
  },
  tableContainer: {
    flex: 2,
  },
  text: { margin: 6 },
  row: {
    flexDirection: "row",
  },
  header: { height: 35, backgroundColor: "#1A82C3" },
  myOrderlist: {
    width: "100%",
    maxHeight: 100,
  },
  cfmButton: {
    alignItems: "center",
    backgroundColor: "pink",
  },
  btnContainer: {
    alignItems: "center",
  },
});
