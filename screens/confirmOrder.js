import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Image,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import ConfirmButton from "../shared/confirmButton";
import { globalStyles } from "../styles/global";
import PurchasedItem from "../components/purchasedItem";
// import DatePicker from "react-native-datepicker";
import DatePickerModal from "react-native-modal-datetime-picker";
import firebase from "../database/firebase";
import { Icon } from "react-native-elements";

export default class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    // console.log(this.props.route.params.purchasedItems);
    this.state = {
      purchasedItems: this.props.route.params.purchasedItems,
      purchasedNo: this.props.route.params.purchasedNo,
      orderDate: this.props.route.params.orderDate,
      deliverAddress: "",
      requestDeliverDate: this.props.route.params.orderDate,
      note: "",
      currentShopId: this.props.route.params.currentShop.currentShopId,
      currentShopName: this.props.route.params.currentShop.currentShopName,
      visibility: false,
    };
  }

  submitPressHandler = () => {
    var currentUser = firebase.auth().currentUser;
    if (currentUser) {
      // console.log("itemsssssssssssssssssssssssssmmmmmmmmmmm");
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

  //TODO: need to handle invalid selected date
  handleConfirm = (date) => {
    // var currentD = this.state.orderDate.split("-");
    // var currentDay = currentD[0];
    // var currentMonth = currentD[1];
    // var currentYear = currentD[2];
    var d = new Date(date.toUTCString());
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.setState({ requestDeliverDate: day + "-" + month + "-" + year });
    this.setState({ visibility: false });
  };

  onPressCancel = () => {
    this.setState({ visibility: false });
  };
  showDateSelectionModal = () => {
    // console.log("select hhhhhhh");
    this.setState({ visibility: true });
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
              {/* <Button title="select date" onPress={this.onPressButton} /> */}
              <View style={styles.datePicker}>
                <Icon name="date-range" iconStyle={styles.calendarIcon} />
                <TouchableOpacity onPress={this.showDateSelectionModal}>
                  <Text style={styles.dateText}>
                    {this.state.requestDeliverDate}
                  </Text>
                </TouchableOpacity>
                <DatePickerModal
                  isVisible={this.state.visibility}
                  onConfirm={this.handleConfirm}
                  onCancel={this.onPressCancel}
                  mode="date"
                />
              </View>
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
  datePicker: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    alignSelf: "flex-end",

    // borderWidth: 1,
    // borderColor: "#ddd",
    // width: "100%",
    // textAlign: "center",
    // fontSize: 15,
    // alignSelf: "flex-end",
  },
  dateText: {
    marginLeft: 34,
    alignSelf: "center",
    // borderWidth: 1,
    fontSize: 15,
  },
  calendarIcon: {
    // alignSelf: "center",
    // borderWidth: 1,
  },
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
