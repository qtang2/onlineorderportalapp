import React, { Component } from "react";
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
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    loading: false,
  };

  signupSuccess = (res) => {
    Alert.alert("Welcome ", this.state.email);
    res.user.updateProfile({ displayName: this.state.email });
    console.log("signup sueccesfully");
    this.setState({
      loa: false,
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    });
  };

  signupPressHandler = () => {
    console.log("sign up button clicked");
    if (!(this.state.password === this.state.confirmPassword)) {
      Alert.alert("OOPS!", "Please enter same password", [
        { text: "Understood", onPress: () => console.log("alert close") },
      ]);
    } else {
      this.setState({ loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.email.trim(),
          this.state.password
        )
        .then(this.signupSuccess)
        .catch((err) => {
          this.setState({ error: err.message });
          Alert.alert("OOPS!", err.message, [
            { text: "Understood", onPress: () => console.log("alert close") },
          ]);
        });
    }
    // this.props.navigation.navigate("MyOrders");
    this.props.navigation.navigate("DrawerNavigator");
    console.log(this.state.email);
  };

  loginPressHandler = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
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
            placeholder="email"
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
          <TouchableOpacity onPress={this.loginPressHandler}>
            <Text style={globalStyles.text}>
              Already registered? Click here to login
            </Text>
          </TouchableOpacity>
          <View style={globalStyles.line}></View>
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
  socialIconsContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  container: {
    backgroundColor: "green",
  },
});

export default Signup;
