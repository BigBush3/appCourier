import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import * as Font from "expo-font";

import iconSuccese from "../../../assets/images/ui/rounded-2x.png";

export default class UiSuccessCard extends React.Component {
  state = { fontsLoaded: false };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.topText}>
            <Image style={styles.topTextImage} source={iconSuccese} />
            <Text style={styles.topTextTitle}>{this.props.successeTitle}</Text>
            <Text style={styles.topTextText}>{this.props.successeText}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  topText: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topTextImage: {
    width: 48,
    height: 48,
    marginBottom: 24,
    resizeMode: "contain",
  },
  topTextTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 24,
    lineHeight: 30,
    color: "rgb(16,0,43)",
    marginBottom: 8,
  },
  topTextText: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    lineHeight: 24,
    color: "rgb(138,149,157)",
    marginBottom: 24,
  },
  bottomButton: {
    flexGrow: 0,
    flexShrink: 0,
    padding: 16,
  },
});
