import React, { Component } from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Header from "../shared/header";
import AddItems from "../screens/addItems";

const Stack = createStackNavigator();

class AddItemsStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="AddItems"
          component={AddItems}
          options={{
            headerTitle: () => (
              <Header navigation={this.props.navigation} title="Add Items" />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default AddItemsStack;
