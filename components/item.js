import React, { useState, Component } from "react";
import { StyleSheet, View, Text, Image, Modal, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

export default class Item extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      openModal: false,
      CICode: "",
      location: "",
    };
  }

  changeCICode = () => {
    this.setState({
      openModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      openModal: false,
    });
  };

  saveChangedCICode = () => {
    console.log("****************      " + this.state.CICode);
    this.props.onChangeCICode(this.state.CICode);
  };
  render() {
    return (
      <View style={styles.itemRow}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/coffeecup.png")}
            style={styles.image}
          />
          <Text style={styles.itemCodeText}>{this.props.itemCode}</Text>
        </View>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemText}>{this.props.itemName}</Text>
          <Text style={styles.itemText}>
            $ {this.props.price}, GST: {this.props.GST}
          </Text>
          <TouchableOpacity onPress={this.changeCICode}>
            <Text style={styles.itemText}>C.I. Code: {this.props.CICode}</Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={this.state.openModal}
            // style={{ flexDirection: "row", alignSelf: "center" }}
          >
            <View style={styles.modal}>
              <View style={styles.modalHead}>
                <Text style={styles.modalHeadText}>
                  Enter Customer Item Code:
                </Text>
              </View>
              <View style={styles.changeRow}>
                <TextInput
                  placeholder={this.props.CICode}
                  style={styles.input}
                  onChangeText={(CICode) => this.setState({ CICode })}
                />
                <TouchableOpacity>
                  <View style={styles.saveButton}>
                    <Icon name="done" onPress={this.saveChangedCICode} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.closeButton}>
                    <Icon name="close" onPress={this.closeModal} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.itemText}>Location: {this.props.location}</Text>
        </View>
        {/* <View style={styles.cardContent}>{props.children}</View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalHeadText: {
    fontSize: 17,
  },

  input: {
    flex: 3,
    borderWidth: 1,
    borderRadius: 2,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#F1FFEF",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  saveButton: {
    borderRadius: 3,
    backgroundColor: "#1A82C3",
    marginHorizontal: 10,
    width: 40,
    height: 30,
    textAlign: "center",
    opacity: 0.8,
  },
  closeButton: {
    borderRadius: 3,
    backgroundColor: "grey",
    marginHorizontal: 10,
    width: 40,
    height: 30,
    textAlign: "center",
    opacity: 0.8,
  },
  modal: {
    backgroundColor: "#ffffff",
    height: "18%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 100,
  },
  modalHead: {
    // backgroundColor: "gray",
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    marginVertical: 20,
  },
  changeRow: {
    flexDirection: "row",
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
  itemInfoContainer: {
    flex: 3,
    flexDirection: "column",
    // marginVertical: 5,
    // paddingVertical: 5,
    // borderBottomWidth: 1,
  },
  imageContainer: {
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
    backgroundColor: "#ffff",
    // shadowOffset: { height: 1, width: 1 },
    // shadowColor: "#333",
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    marginHorizontal: 2,
    marginVertical: 4,
    opacity: 0.8,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
});
