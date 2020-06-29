import React, { Component } from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import MyOrders from "../screens/myOrders";
import Header from "../shared/header";

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
      </Stack.Navigator>
    );
  }
}

export default MyOrdersStack;
