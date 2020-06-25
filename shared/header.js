import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

class Header extends Component {
  openMenu = () => {
    this.props.navigation.openDrawer();
  };
  render() {
    return (
      <View style={styles.header}>
        <MaterialIcons
          name="menu"
          size={28}
          onPress={this.openMenu}
          style={styles.icon}
        />
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get("screen").width,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
  },
  headerTitle: {
    flexDirection: "row",
  },
});

export default Header;
