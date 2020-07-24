import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import ConfirmButton from "../shared/confirmButton";
import { globalStyles } from "../styles/global";
import PurchasedItem from "../components/purchasedItem";
import DatePicker from "react-native-datepicker";
import firebase from "../database/firebase";

export default class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasedItems: this.props.route.params.purchasedItems,
      purchasedNo: this.props.route.params.purchasedNo,
      orderDate: this.props.route.params.orderDate,
      deliverAddress: "",
      requestDeliverDate: this.props.route.params.orderDate,
      note: "",
      currentShopId: this.props.route.params.currentShop.currentShopId,
      currentShopName: this.props.route.params.currentShop.currentShopName,
    };
  }

  submitPressHandler = () => {
    // Alert.alert(" ", "Submit Successfully!", [
    //   {
    //     text: "Close",
    //     onPress: () => this.props.navigation.navigate("MyOrders"),
    //   },
    // ]);
    // console.log(this.state.deliverAddress);
    var currentUser = firebase.auth().currentUser;
    console.log(
      currentUser.uid +
        "   " +
        this.state.currentShopId +
        "    " +
        this.state.purchasedNo
    );
    if (currentUser) {
      // console.log(this.state.purchasedItems);
      firebase
        .database()
        .ref("/myOrders")
        .child(currentUser.uid)
        .child(this.state.currentShopId)
        .child(this.state.purchasedNo)
        .set({
          // purchasedItems: this.state.purchasedItems,
          orderDate: this.state.orderDate,
          deliverAddress: this.state.deliverAddress,
          requestDeliverDate: this.state.requestDeliverDate,
          note: this.state.note,
        });
      this.state.purchasedItems.forEach((item) => {
        firebase
          .database()
          .ref("/myOrders")
          .child(currentUser.uid)
          .child(this.state.currentShopId)
          .child(this.state.purchasedNo)
          .child("/purchasedItems")
          .child(item.itemCode)
          .set({
            quatity: item.quatity,
            price: item.price,
          });
      });
    } else {
      console.log("no such a user");
    }
    Alert.alert(" ", "Order Submitted Successfully!", [
      {
        text: "Close",
        onPress: () => {
          this.props.navigation.navigate("MyOrders");
        },
      },
    ]);
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={globalStyles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <KeyboardAvoidingView
          style={styles.shop}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Text style={styles.shopText}>{this.state.currentShopName}</Text>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          style={globalStyles.line}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        ></KeyboardAvoidingView>

        <KeyboardAvoidingView
          style={styles.orderInfoContainer}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Purchase No. </Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <Text style={styles.infoTextRight}>{this.state.purchasedNo}</Text>
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
              <Text style={styles.infoTextLeft}>Deliver To</Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <TextInput
                placeholder="input address"
                // value={this.state.paymentAmount}
                onChangeText={(deliverAddress) =>
                  this.setState({ deliverAddress: deliverAddress })
                }
                style={styles.infoTextRight}
              />
            </View>
          </View>

          <View style={styles.orderInfoRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}>Request Deliver Date</Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <DatePicker
                style={styles.date}
                date={this.state.requestDeliverDate}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2016"
                maxDate="01-01-2100"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    // top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    // marginLeft: 36,
                    borderColor: "#ddd",
                  },
                }}
                onDateChange={(date) => {
                  this.setState({ requestDeliverDate: date });
                }}
              />
            </View>
          </View>

          <View style={styles.orderInfoNoteRow}>
            <View style={styles.orderInfoRowLeft}>
              <Text style={styles.infoTextLeft}> Note </Text>
            </View>

            <View style={styles.orderInfoRowRight}>
              <TextInput
                style={styles.noteInput}
                multiline
                value={this.state.note}
                onChangeText={(note) => this.setState({ note: note })}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <Text> Purchased Items </Text>
        <View style={globalStyles.line}></View>
        <View style={styles.flatlistContainer}>
          <FlatList
            keyExtractor={(item) => item.itemCode}
            data={this.state.purchasedItems}
            // style={{ borderWidth: 1 }}
            renderItem={({ item }) => (
              <PurchasedItem
                itemCode={item.itemCode}
                itemName={item.itemName}
                price={item.price}
                itemImage={item.itemImage}
                GST={item.GST}
                category={item.category}
                location={item.location}
                CICode={item.CICode}
                quatity={item.quatity}
              />
            )}
          />
        </View>

        <ConfirmButton text="Submit" onPress={this.submitPressHandler} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  orderInfoContainer: {
    flex: 4.5,
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 15,
    // borderWidth: 1,
  },
  flatlistContainer: {
    flex: 3,
    // borderWidth: 1,
  },
  orderInfoRow: {
    flexDirection: "row",
    flex: 1,
  },
  orderInfoNoteRow: {
    flexDirection: "row",
    // flex: 3,
  },
  orderInfoRowLeft: {
    flexDirection: "column",
    flex: 2,
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
  shop: {
    flexDirection: "column",
    // borderWidth: 1,
  },
  shopText: {
    fontSize: 16,
    alignSelf: "center",
  },

  infoTextLeft: {
    textAlign: "left",
    fontSize: 14,
    // marginVertical: 7,
    alignSelf: "flex-start",
  },
  infoTextRight: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    alignSelf: "flex-end",
    // backgroundColor: "pink",
  },
  date: {
    // borderWidth: 1,
    width: "100%",
    // borderColor: "#ddd",
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
    height: 50,
    alignSelf: "flex-end",
  },
});
