import React from "react";
import { StyleSheet, Text, View } from "react-native";

import * as Font from "expo-font";

export default class UiPageTitle extends React.Component {
  state = { fontsLoaded: false };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }

    return (
      <View style={styles.pageTitle}>
        <Text style={styles.pageTitleText}>{this.props.pageTitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageTitle: {
    height: 74,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  pageTitleText: {
    color: "rgb(16,0,43)",
    fontSize: 36,
    lineHeight: 42,
    fontFamily: "Roboto-Medium",
  },
});
