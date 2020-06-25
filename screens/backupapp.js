import React, { Component } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/login";
import Signup from "./screens/signup";
import MyOrders from "./screens/myOrders";
import firebase from "firebase";
import StartNavigator from "./routes/startStack";
import RootStack from "./routes/rootStack";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MyOrdersStack from "./routes/myOrdersStack";
import ManageOrders from "./screens/manageOrders";

const Stack = createStackNavigator();

class App extends Component {
  state = {
    loggedIn: null,
  };

  componentDidMount() {
    console.log("did mount loggedIn ", this.state.loggedIn);
    var firebaseConfig = {
      apiKey: "AIzaSyASR4GAXSRGsiDhOTF_UsdqHzqHYcHPk_U",
      authDomain: "onlineorderportal-68a8f.firebaseapp.com",
      databaseURL: "https://onlineorderportal-68a8f.firebaseio.com",
      projectId: "onlineorderportal-68a8f",
      storageBucket: "onlineorderportal-68a8f.appspot.com",
      messagingSenderId: "658149255251",
      appId: "1:658149255251:web:37940844cdc5403e173ea6",
      measurementId: "G-KGQ1F2F3WE",
    };
    console.log("length");
    console.log(!firebase.apps.length);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      console.log("else else");
      firebase.auth().onAuthStateChanged((user) => {
        console.log("User User  ");
        if (user) {
          console.log("loggedIn true !!! ");
          this.setState({ loggedIn: true });
        } else {
          console.log("loggedIn false @@@");
          this.setState({ loggedIn: false });
        }
        console.log("inside if if if ");
      });
    }
    console.log("didmount end " + this.state.loggedIn);
  }

  renderContent = () => {
    console.log("render mehton!!!! " + this.state.loggedIn);
    if (this.state.loggedIn) {
      return <MyOrders />;
    } else {
      return <Login />;
      // return <Signup />;
      // return <StartNavigator />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Login /> */}
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
