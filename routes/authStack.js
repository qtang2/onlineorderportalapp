import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Loading from "../screens/loading";
import DrawerNavigator from "../routes/drawer";

const Stack = createStackNavigator();

class AuthStack extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          // screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Loading"
            component={Loading}
            navigation={this.props.navigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            navigation={this.props.navigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            navigation={this.props.navigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            navigation={this.props.navigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AuthStack;
