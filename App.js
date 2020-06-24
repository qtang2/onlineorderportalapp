import React, { Component } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/login";
import Signup from "./screens/signup";
import MyOrders from "./screens/myOrders";
import firebase from "firebase";
import HomeNavigator from "./routes/homeStack";

class App extends Component {
  state = {
    loggedIn: null,
  };

  componentDidMount() {
    // console.log("inital loggedIn ", this.state.loggedIn);
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
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("loggedIn true !!! ");
          this.setState({ loggedIn: true });
        } else {
          console.log("loggedIn false @@@");
          this.setState({ loggedIn: false });
        }
      });
    }
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case false:
        console.log("false case login");
        // return <Login />;
        return <Signup />;
      case true:
        console.log("true case Navigator");
        return <MyOrders />;

      // return <HomeNavigator />;
      // default:
      //   return <MyOrders />;
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
