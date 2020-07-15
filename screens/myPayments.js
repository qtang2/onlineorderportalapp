import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import { SearchBar } from "react-native-elements";
import firebase from "../database/firebase";
import ResetButton from "../shared/resetButton";
import ShopsPicker from "../shared/shopsPicker";
import Payment from "../components/payment";

export default class MyPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      myPayments: [],
      search: "",
      currentShopId: "",
      // currentShopName: ""
      search: "",
    };
    this.arrayholder = []; // For search function
    // this.onChange = this.onChange.bind(this);
  }

  //Only can search based on transaction number
  searchFilterFunction = (text) => {
    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.paymentId.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ myPayments: newData, search: text });
  };

  fetchPaymentsData = (shopId) => {
    var rootRef = firebase.database().ref();
    var currentUserId = firebase.auth().currentUser.uid;
    var myPaymentsRef = rootRef.child("myPayments");
    var paymentsList = [];
    myPaymentsRef
      .child(currentUserId)
      .child(shopId)
      .on("child_added", (snapshot) => {
        var paymentObj = {
          paymentId: snapshot.key,
          paymentAmount: snapshot.toJSON().paymentAmount,
          allocatedAmount: snapshot.toJSON().allocatedAmount,
          paymentMethod: snapshot.toJSON().paymentMethod,
          status: snapshot.toJSON().status,
          note:
            snapshot.toJSON().note == ""
              ? "Empty note"
              : snapshot.toJSON().note,
          transactionDate: snapshot.toJSON().transactionDate,
          createdBy: firebase.auth().currentUser.email,
          createdDate: snapshot.toJSON().transactionDate, //TODO need to modify when figure out where to get transactionDate
        };
        paymentsList.push(paymentObj);
        this.setState({
          dataFetched: true,
          myPayments: paymentsList,
        });
        this.arrayholder = paymentsList;
      });
  };

  addNewPayment = () => {
    var currentShopName = "";
    var currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase
        .database()
        .ref("/shops")
        .child(this.state.currentShopId)
        .once("value", (snapshot) => {
          currentShopName = snapshot.toJSON().shopName;
          var shopObj = {
            currentShopId: this.state.currentShopId,
            currentShopName: currentShopName,
          };
          this.props.navigation.navigate("PaymentDetails", {
            currentShop: shopObj,
          });
        });
    } else {
      console.log("no such a user");
    }
  };

  //When get shop Id, then get the payments under this shop
  getCurrentShop = (shopId) => {
    this.setState({ currentShopId: shopId });
    this.fetchPaymentsData(shopId);
  };

  render() {
    // console.log(this.state.myPayments);
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
          keyExtractor={(payment) => payment.paymentId}
          data={this.state.myPayments}
          renderItem={({ item }) => {
            return (
              <Payment
                paymentId={item.paymentId}
                allocatedAmount={item.allocatedAmount}
                createdBy={item.createdBy}
                createdDate={item.createdDate}
                note={item.note}
                paymentAmount={item.paymentAmount}
                paymentMethod={item.paymentMethod}
                status={item.status}
                transactionDate={item.transactionDate}
              />
            );
            // }
          }}
        />
        <ResetButton text="New" onPress={this.addNewPayment} />
      </View>
    );
  }
}
