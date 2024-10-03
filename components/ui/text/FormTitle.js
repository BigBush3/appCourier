import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import * as Font from "expo-font";

import rectangle from "../../../assets/images/ui/rectangle-2x.png";

export default class UiFormTitle extends React.Component {
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
      <View style={styles.formTitle}>
        <View style={styles.title}>
          <Text style={styles.titlePolisText}>{this.props.formTitleText}</Text>
          <Text style={styles.titlePolisSelect}>
            {this.props.formTitleSelect}
          </Text>
        </View>
        <View style={styles.rectangle}>
          <Image source={rectangle} style={styles.rectangleImage} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formTitle: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgb(226,224,229)",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: "flex-start",
  },
  titlePolisText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(138,149,157)",
  },
  titlePolisSelect: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(16,0,43)",
  },
  rectangle: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 0,
  },
  rectangleImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
