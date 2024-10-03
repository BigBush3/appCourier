import React from "react";
import { StyleSheet, Text, View } from "react-native";

import * as Font from "expo-font";

export default class UiTitlePolis extends React.Component {
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
      <View style={styles.titlePolis}>
        <Text style={styles.titlePolisText}>{this.props.titlePolisText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titlePolis: {
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 45,
  },
  titlePolisText: {
    fontSize: 24,
    lineHeight: 30,
    color: "rgb(16,0,43)",
    fontFamily: "Roboto-Medium",
  },
});
