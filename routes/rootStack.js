import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MyOrders from "../screens/myOrders";
import ManageOrders from "../screens/manageOrders";
import AuthStack from "./authStack";
import DrawerNavigator from "./drawer";

const Stack = createStackNavigator();

// root stack include authstack and drawernavigator
function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthStack">
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
