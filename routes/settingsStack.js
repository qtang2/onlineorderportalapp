import React, { Component } from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Header from "../shared/header";
import Settings from "../screens/settings";

const Stack = createStackNavigator();

class SettingsStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitle: () => (
              <Header navigation={this.props.navigation} title="Settings" />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default SettingsStack;
