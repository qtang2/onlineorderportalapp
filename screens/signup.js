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
import { SocialIcon } from "react-native-elements";

class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    loading: false,
  };

  signupPressHandler = () => {
    console.log("sign up button clicked");
    // console.log(this.state.email);
  };

  backToLogin = () => {};

  //   loginSuccess = () => {
  //     this.setState({ error: "", loading: false });
  //   };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log("dismisss");
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
            placeholder="Firstname"
            value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Lastname"
            value={this.state.lastname}
            onChangeText={(lastname) => this.setState({ lastname })}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="email"
            value={this.state.emal}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
          />
          <LoginButton text="sign up" onPress={this.signupPressHandler} />
          <TouchableOpacity onPress={this.backToLogin}>
            <Text style={globalStyles.text}>
              Already registered? Click here to login
            </Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <Text style={globalStyles.text}>Or sign up using</Text>
          <View style={styles.socialIconsContainer}>
            <SocialIcon type="facebook" />
            <SocialIcon type="twitter" />
            <SocialIcon type="instagram" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 12,
    marginTop: 12,
  },
  socialIconsContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
});

export default Signup;
