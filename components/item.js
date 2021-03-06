import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import firebase from "../database/firebase";

export default class Item extends Component {
  constructor(props) {
    super(props);
    // console.log(props.itemImage);
    this.state = {
      openCICodeModal: false,
      openLocationModal: false,
      CICode: "",
      location: "",
    };
  }

  changeCICode = () => {
    this.setState({
      openCICodeModal: true,
    });
  };
  changeLocation = () => {
    this.setState({
      openLocationModal: true,
    });
  };

  closeCICodeModal = () => {
    this.setState({
      openCICodeModal: false,
    });
  };
  closeLocationModal = () => {
    this.setState({
      openLocationModal: false,
    });
  };

  saveChangedCICode = (e) => {
    console.log(this.state.CICode);
    Alert.alert("", "Function in progress", [
      { text: "Close", onPress: () => this.closeCICodeModal() },
    ]);
  };

  saveChangedLocation = (e) => {
    // console.log("****************      " + e);
    console.log(this.state.location);
    Alert.alert("", "Function in progress", [
      { text: "Close", onPress: () => this.closeLocationModal() },
    ]);
  };

  render() {
    return (
      <View style={styles.itemRow}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: this.props.itemImage }} style={styles.image} />
          <Text style={styles.itemCodeText}>{this.props.itemCode}</Text>
        </View>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemText}>{this.props.itemName}</Text>
          <Text style={styles.itemText}>
            {this.props.price}, GST: {this.props.GST}
          </Text>
          <TouchableOpacity onLongPress={this.changeCICode}>
            <Text style={styles.changableItemText}>
              C.I. Code: {this.props.CICode}
            </Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={this.state.openCICodeModal}
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
                    <Icon
                      name="done"
                      onPress={(newCICode) => this.saveChangedCICode(newCICode)}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.closeButton}>
                    <Icon name="close" onPress={this.closeCICodeModal} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity onLongPress={this.changeLocation}>
            <Text style={styles.changableItemText}>
              Location: {this.props.location}
            </Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            visible={this.state.openLocationModal}
            // style={{ flexDirection: "row", alignSelf: "center" }}
          >
            <View style={styles.modal}>
              <View style={styles.modalHead}>
                <Text style={styles.modalHeadText}>Enter Item Location:</Text>
              </View>
              <View style={styles.changeRow}>
                <TextInput
                  placeholder={this.props.location}
                  style={styles.input}
                  onChangeText={(location) => this.setState({ location })}
                />
                <TouchableOpacity>
                  <View style={styles.saveButton}>
                    <Icon
                      name="done"
                      onPress={(newLocation) =>
                        this.saveChangedLocation(newLocation)
                      }
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.closeButton}>
                    <Icon name="close" onPress={this.closeLocationModal} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    borderColor: "#d4d4d9",
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
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d4d4d9",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 100,
    // opacity: 0.7,
  },
  modalHead: {
    // backgroundColor: "gray",
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    marginVertical: 15,
  },
  changeRow: {
    flexDirection: "row",
    marginVertical: 15,
  },
  itemText: {
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    // alignSelf: "center",
    marginVertical: 5,
    // paddingVertical: 10,
  },
  changableItemText: {
    color: "#1A82C3",
    borderBottomWidth: 1,
    borderColor: "#d4d4d9",
    marginVertical: 5,
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
    // borderWidth: 1,
  },
  itemInfoContainer: {
    flex: 3,
    flexDirection: "column",
    // marginVertical: 5,
    // paddingVertical: 5,
    // borderBottomWidth: 1,
  },
  imageContainer: {
    flex: 1.5,
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
