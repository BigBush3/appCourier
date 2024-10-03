import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as Font from "expo-font";

export default class UiLinkButton extends React.Component {
  state = { fontsLoaded: false };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }

    return (
      <TouchableOpacity
        onPress={this.props.linkPress}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>{this.props.linkText} </Text>
        <Text style={styles.linkLink}>{this.props.linkLink}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: "100%",
  },
  linkText: {
    color: "rgb(138,149,157)",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontFamily: "Roboto-Regular",
  },
  linkLink: {
    color: "#8db63b",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontFamily: "Roboto-Regular",
  },
});
