import React, { Component } from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./routes/authStack";

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return <AuthStack />;
  }
}

export default App;
