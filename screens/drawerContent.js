import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { Avatar, Drawer, Text } from "react-native-paper";

function HomeDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View>
            <Text style={styles.title}>Online Order</Text>
            <View style={globalStyles.line}></View>
          </View>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Image source={require("../assets/coffeecup.png")} />
              <View style={styles.welcome}>
                <Text>Welcome</Text>
                {/* TODO: this should show the user's name */}
                <Text> User1</Text>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerContent}>
            <DrawerItem
              label="My Orders"
              onPress={() => {
                props.navigation.navigate("MyOrders");
              }}
            />
            <DrawerItem
              label="Manage Orders"
              onPress={() => {
                props.navigation.navigate("ManageOrders");
              }}
            />
            <DrawerItem
              label="My Statements"
              onPress={() => {
                props.navigation.navigate("MyStatements");
              }}
            />
            <DrawerItem
              label="My Payments"
              onPress={() => {
                props.navigation.navigate("MyPayments");
              }}
            />
            <DrawerItem
              label="My Items"
              onPress={() => {
                props.navigation.navigate("MyItems");
              }}
            />
            <DrawerItem
              label="Add Items"
              onPress={() => {
                props.navigation.navigate("AddItems");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => {
            <Icon name="settings" />;
          }}
          label="Settings"
          onPress={() => {
            props.navigation.navigate("Settings");
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#d4d4d4",
    borderTopWidth: 1,
  },
  welcome: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
  },
});
export default HomeDrawerContent;
