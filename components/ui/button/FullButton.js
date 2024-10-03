import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

export default class UiFullButton extends React.Component {
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
        onPress={this.props.fullBtnPress}
        style={styles.fullButton}
      >
        <Text style={styles.fullButtonText}>{this.props.fullBtnText}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  fullButton: {
    backgroundColor: "rgb(141,182,59)",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: "100%",
  },
  fullButtonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontFamily: "Roboto-Medium",
  },
});
