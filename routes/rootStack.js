import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MyOrders from "../screens/myOrders";
import ManageOrders from "../screens/manageOrders";

const Stack = createStackNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyOrders">
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="ManageOrders" component={ManageOrders} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
