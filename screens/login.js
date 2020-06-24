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
import firebase from "firebase";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
  };

  loginPressHandler = () => {
    // var emailString = this.state.email.toString();
    // var pwString = this.state.password.toString();
    console.log("button clicked");
    // console.log(this.state.email);
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email.trim(), this.state.password)
      .then(this.loginSuccess)
      .catch((err) => {
        this.setState({ error: err.message });
        Alert.alert("OOPS!", err.message, [
          { text: "Understood", onPress: () => console.log("alert close") },
        ]);
      });
  };

  loginSuccess = () => {
    this.setState({ error: "", loading: false });
  };

  //TODO: signup function
  signupPressHandler = () => {
    // console.log("Text Preeeeeeeeeesss");
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
