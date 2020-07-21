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

export default class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasedItems: this.props.route.params.purchasedItems,
      purchasedNo: this.props.route.params.purchasedNo,
      orderDate: this.props.route.params.orderDate,
      deliverAddress: "",
      requestDeliverDate: "",
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
    console.log(this.state.deliverAddress);
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
              <TextInput
                placeholder="input date"
                onChangeText={(requestDeliverDate) =>
                  this.setState({ requestDeliverDate: requestDeliverDate })
                }
                style={styles.infoTextRight}
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
        <View style={globalStyles.line}></View>
        <Text> Purchased Items </Text>
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
