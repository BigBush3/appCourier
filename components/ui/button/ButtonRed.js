import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

export default class UiButtonRed extends React.Component {
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
          styles.redButton,
          this.props.disabled ? styles.disButton : null,
        ]}
        disabled={this.props.disabled}
        onPress={this.props.redPress}
      >
        <Text
          style={[
            styles.redButtonText,
            this.props.disabled ? styles.disButtonText : null,
          ]}
        >
          {this.props.redBtnText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  redButton: {
    backgroundColor: "rgba(252,63,63,0.87)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: "100%",
    marginTop: 8,
  },
  disButton: {
    backgroundColor: "rgb(226,224,229)",
  },
  redButtonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontFamily: "Roboto-Medium",
  },
  disButtonText: {
    color: "rgb(138,149,157)",
  },
});
