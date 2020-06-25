import React, { Component } from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Header from "../shared/header";
import MyItems from "../screens/myItems";

const Stack = createStackNavigator();

class MyItemsStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyItems"
          component={MyItems}
          options={{
            headerTitle: () => (
              <Header navigation={this.props.navigation} title="My Items" />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MyItemsStack;
