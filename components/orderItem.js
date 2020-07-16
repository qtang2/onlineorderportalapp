import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TextInput, Alert } from "react-native";
import firebase from "../database/firebase";
import { Icon } from "react-native-elements";

export default class OrderItem extends Component {
  constructor(props) {
    super(props);
    // console.log("orderitem propssssssssssssssssssss");
    // console.log(props);
    this.state = {
      quatity: 0,
      amount: 0,
    };
  }

  changeQuatity(quatity) {
    this.setState({ quatity: quatity });
    var amount = this.props.price * quatity;
    this.setState({
      amount: amount,
    });
    console.log(quatity);
  }

  reduceQuatity() {
    var curQuatity = this.state.quatity - 1;
    // this.setState({
    //   quatity: curQuatity,
    // });
  }
  addQuatity() {
    console.log(this.state.quatity);
    // var curQuatity = this.state.quatity + 1;
    // this.setState({
    //   quatity: curQuatity,
    // });
  }

  render() {
    return (
      <View style={styles.itemRow}>
        <View style={styles.leftContainer}>
          <Image
            source={require("../assets/coffeecup.png")}
            style={styles.image}
          />
          <Text style={styles.itemCodeText}>{this.props.itemCode}</Text>
          <Text style={styles.itemCodeText}>{this.props.CICode}</Text>
          <Text style={styles.itemCodeText}>{this.props.location}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.itemText}>{this.props.itemName}</Text>
          <Text style={styles.itemText}>
            $ {this.props.price} , GST: {this.props.GST}
          </Text>
          <View style={styles.quatityContainer}>
            {/* <Icon
              name="remove"
              onPress={this.reduceQuatity}
              style={styles.icon}
            /> */}
            <TextInput
              placeholder="0"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(quatity) => this.changeQuatity(quatity)}
            />
            {/* <Icon name="add" onPress={this.addQuatity} style={styles.icon} /> */}
            <Text style={styles.amountText}> = $ {this.state.amount}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
