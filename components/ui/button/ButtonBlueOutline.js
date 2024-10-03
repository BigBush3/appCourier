import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

export default class UiButtonBlueOutline extends React.Component {
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
        onPress={this.props.outlinePress}
      >
        <Text style={styles.blueButtonText}>{this.props.blueOutlineText}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  blueButton: {
    backgroundColor: "#fff",
    borderColor: "rgb(2,177,169)",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    flexGrow: 0,
    flexShrink: 0,
    width: 194,
  },
  blueButtonText: {
    color: "rgb(2,177,169)",
    fontSize: 14,
    fontFamily: "Roboto-Medium",
    lineHeight: 20,
    letterSpacing: 0.22,
  },
});
