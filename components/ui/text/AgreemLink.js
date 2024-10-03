import React from "react";
import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";

import * as Font from "expo-font";

export default class UiAgreemLink extends React.Component {
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
        onPress={() => Alert.alert("")}
        style={styles.linkButton}
      >
        <Text style={styles.textColumn}>
          <Text style={styles.linkText}>{this.props.agreeText}</Text>
          <Text style={styles.linkLink}>{this.props.agreeTextLink}</Text>
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 14,
    width: "100%",
  },
  textColumn: {
    flexDirection: "column",
  },
  linkText: {
    color: "#939ea5",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  linkLink: {
    color: "#0e78cc",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
});
