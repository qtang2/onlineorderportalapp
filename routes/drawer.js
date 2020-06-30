import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyOrdersStack from "../routes/myOrdersStack";
import ManageOrdersStack from "../routes/manageOrdersStack";
import MyStatementsStack from "./myStatementsStack";
import MyPaymentsStack from "./myPaymentsStack";
import MyItemsStack from "./myItemsStack";
import AddItemsStack from "./addItemsStack";
import HomeDrawerContent from "../screens/drawerContent";
import SettingsStack from "./settingsStack";

const Drawer = createDrawerNavigator();

class DrawerNavigator extends Component {
  render() {
    return (
      <Drawer.Navigator
        initialRouteName="MyOrders"
        drawerContent={(props) => <HomeDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="MyOrders"
          component={MyOrdersStack}
          options={{ title: "My Orders" }}
        />
        <Drawer.Screen
          name="ManageOrders"
          component={ManageOrdersStack}
          options={{ title: "Manage Orders" }}
        />
        <Drawer.Screen
          name="MyStatements"
          component={MyStatementsStack}
          options={{ title: "My Statements" }}
        />
        <Drawer.Screen
          name="MyPayments"
          component={MyPaymentsStack}
          options={{ title: "My Payments" }}
        />
        <Drawer.Screen
          name="MyItems"
          component={MyItemsStack}
          options={{ title: "My Items" }}
        />
        <Drawer.Screen
          name="AddItems"
          component={AddItemsStack}
          options={{ title: "Add Items" }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsStack}
          options={{ title: "Settings" }}
        />
      </Drawer.Navigator>
    );
  }
}

export default DrawerNavigator;
