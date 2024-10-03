import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

import rectangle from "../../../assets/images/ui/rectangle-2x.png";

export default class UiSelectTitle extends React.Component {
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
        style={styles.selectTitle}
        onPress={this.props.selectPress}
      >
        <View style={styles.title}>
          <Text style={styles.selectTitleText}>
            {this.props.selectTitleText}
          </Text>
          <Text
            style={styles.selectTitleSelect}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {this.props.selectTitleSelect}
          </Text>
        </View>
        <View style={styles.rectangle}>
          <Image source={rectangle} style={styles.rectangleImage} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  selectTitle: {
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
  selectTitleText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(138,149,157)",
  },
  selectTitleSelect: {
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
