import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

export default class UiButtonBlue extends React.Component {
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
        style={styles.blueButton}
        disabled={this.props.disabled}
        onPress={this.props.onPress}
      >
        <Text style={styles.blueButtonText}>{this.props.buttonBlueText}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  blueButton: {
    backgroundColor: "rgb(2,177,169)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    width: 127,
  },
  blueButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Roboto-Medium",
    lineHeight: 20,
    letterSpacing: 0.22,
  },
});
