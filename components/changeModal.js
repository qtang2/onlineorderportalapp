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

export default class ChangeModal {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
  }

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.state.openModal}
        // style={{ flexDirection: "row", alignSelf: "center" }}
      >
        <View style={styles.modal}>
          <View style={styles.modalHead}>
            <Text style={styles.modalHeadText}>{this.props.modalTitle}</Text>
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
                <Icon name="close" onPress={this.closeModal} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
