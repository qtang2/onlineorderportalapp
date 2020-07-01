import React, { Component } from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import ManageOrders from "../screens/manageOrders";
import Header from "../shared/header";
import OrderDetails from "../screens/orderDetails";

const Stack = createStackNavigator();

class ManageOrdersStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ManageOrders"
          component={ManageOrders}
          options={{
            headerTitle: () => (
              <Header
                navigation={this.props.navigation}
                title="Manage Orders"
              />
            ),
          }}
        />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
      </Stack.Navigator>
    );
  }
}

export default ManageOrdersStack;
