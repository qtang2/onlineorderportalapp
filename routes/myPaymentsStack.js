import React, { Component } from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Header from "../shared/header";
import MyPayments from "../screens/myPayments";

const Stack = createStackNavigator();

class MyPaymentsStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyPayments"
          component={MyPayments}
          options={{
            headerTitle: () => (
              <Header navigation={this.props.navigation} title="My Payments" />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MyPaymentsStack;
