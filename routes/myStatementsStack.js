import React, { Component } from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Header from "../shared/header";
import MyStatements from "../screens/myStatements";

const Stack = createStackNavigator();

class MyStatementsStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyOrders"
          component={MyStatements}
          options={{
            headerTitle: () => (
              <Header
                navigation={this.props.navigation}
                title="My Statements"
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MyStatementsStack;
