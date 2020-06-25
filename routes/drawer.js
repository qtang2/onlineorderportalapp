import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyItems from "../screens/myItems";
import AddItems from "../screens/addItems";
import MyOrdersStack from "../routes/myOrdersStack";
import ManageOrdersStack from "../routes/manageOrdersStack";
import MyStatementsStack from "./myStatementsStack";
import MyPaymentsStack from "./myPaymentsStack";
import MyItemsStack from "./myItemsStack";
import AddItemsStack from "./addItemsStack";

const Drawer = createDrawerNavigator();

class DrawerNavigator extends Component {
  render() {
    return (
      //<NavigationContainer>
      <Drawer.Navigator initialRouteName="MyOrders">
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
      </Drawer.Navigator>
      //</NavigationContainer>
    );
  }
}

export default DrawerNavigator;
