import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as Font from "expo-font";
import Colors from "../../../constants/Colors.js";

export default class UiButtonGreenOutline extends React.Component {
  state = { fontsLoaded: false };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }

    return (
      <TouchableOpacity
        style={[styles.button, this.props.disabled ? styles.disButton : null]}
        disabled={this.props.disabled}
        onPress={this.props.onPress}
      >
        <Text
          style={[
            styles.buttonText,
            this.props.disabled ? styles.disButtonText : null,
          ]}
        >
          {this.props.gOButtonText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: "100%",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.greenColor,
  },
  disButton: {
    backgroundColor: Colors.whiteColor,
  },
  buttonText: {
    color: Colors.greenColor,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontFamily: "Roboto-Medium",
  },
  disButtonText: {
    color: "#e8f0d8",
  },
});
