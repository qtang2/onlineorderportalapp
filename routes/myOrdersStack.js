import React, { Component } from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import MyOrders from "../screens/myOrders";
import Header from "../shared/header";
import ConfirmOrder from "../screens/confirmOrder";

const Stack = createStackNavigator();

class MyOrdersStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{
            headerTitle: () => (
              <Header navigation={this.props.navigation} title="My Orders" />
            ),
          }}
        />
        <Stack.Screen
          name="ConfirmOrder"
          component={ConfirmOrder}
          options={{ title: "Confirm your order" }}
        />
      </Stack.Navigator>
    );
  }
}

export default MyOrdersStack;
