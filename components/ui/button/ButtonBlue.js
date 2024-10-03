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
        style={[
          styles.blackButton,
          this.props.disabled ? styles.disButton : null,
        ]}
        disabled={this.props.disabled}
        onPress={this.props.onPress}
      >
        <Text
          style={[
            styles.blackButtonText,
            this.props.disabled ? styles.disButtonText : null,
          ]}
        >
          {this.props.BBText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  blackButton: {
    backgroundColor: "#00579c",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: "100%",
  },
  disButton: {
    backgroundColor: "#b3e5fc",
  },
  blackButtonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontFamily: "Roboto-Medium",
  },
  disButtonText: {
    color: "#00579c",
  },
});
