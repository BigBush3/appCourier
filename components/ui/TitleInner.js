import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

export default class UiTitleInner extends React.Component {
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
      <View style={styles.titleInner}>
        <Text style={styles.textTitle}>{this.props.titleInner}</Text>
        <TouchableOpacity
          style={styles.buttonTitle}
          onPress={this.props.titleInnerPress}
        >
          <Text style={styles.buttonTitleText}>{this.props.titleInnerBtn}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleInner: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textTitle: {
    fontSize: 16,
    color: "rgb(16,0,43)",
    lineHeight: 22,
    fontFamily: "Roboto-Medium",
  },
  buttonTitle: {
    minWidth: 100,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonTitleText: {
    color: "rgb(2,177,169)",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto-Medium",
  },
});
