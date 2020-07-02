import React, { useState, Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import LoginButton from "../shared/button";
import { globalStyles } from "../styles/global";
import firebase from "../database/firebase";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
  };

  loginPressHandler = () => {
    console.log("button clicked");
    if (this.state.email === "" || this.state.password === "") {
      Alert.alert("OOPS!", "Please enter your details", [
        { text: "Understood", onPress: () => console.log("alert close") },
      ]);
    } else {
      this.setState({ loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.state.email.trim(),
          this.state.password
        )
        .then(this.loginSuccess)
        .catch((err) => {
          this.setState({ error: err.message });
          Alert.alert("OOPS!", err.message, [
            { text: "Understood", onPress: () => console.log("alert close") },
          ]);
        });
    }
  };

  loginSuccess = (res) => {
    console.log("login Success res param " + res);
    this.setState({ email: "", password: "", error: "", loading: false });
    this.props.navigation.navigate("MyOrders");
  };

  //TODO: signup function
  signupPressHandler = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log("dismmmmmmmmmisss");
        }}
      >
        <View style={globalStyles.container}>
          <Image
            source={require("../assets/logo.png")}
            style={globalStyles.logoImage}
          />
          <Text style={globalStyles.title}>Online Order Portal</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <LoginButton text="log in" onPress={this.loginPressHandler} />

          <TouchableOpacity onPress={this.signupPressHandler}>
            <Text style={styles.signupText}>Not a member? Sign up</Text>
          </TouchableOpacity>

          {/* <Text style={styles.errorText}>{this.state.error}</Text> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  signupText: {
    textAlign: "center",
  },
  container: {
    backgroundColor: "pink",
  },
});

export default Login;
