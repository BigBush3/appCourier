import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

import checkImage from "../../../assets/images/ui/checkbox-2x.png";

export default class UiCheckBox extends React.Component {
  state = {
    fontsLoaded: false,
    checkBoxActive: true,
  };

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
        style={styles.checkBox}
        onPress={() => this.props.onPress()}
      >
        <View style={styles.checkBoxButton}>
          {this.props.checkBoxActive ? (
            <Image source={checkImage} style={styles.checkBoxImage} />
          ) : (
            <View style={styles.checkNoActive}></View>
          )}
        </View>
        <Text style={styles.checkBoxText}>{this.props.labelText}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  checkBox: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkBoxButton: {
    width: 24,
    height: 24,
    marginRight: 16,
    flexGrow: 0,
    flexShrink: 0,
  },
  checkBoxImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  checkBoxText: {
    flexGrow: 1,
    flexShrink: 1,
    color: "rgb(16,0,43)",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto-Regular",
  },
  checkNoActive: {
    width: 18,
    height: 18,
    margin: 3,
    borderWidth: 2,
    borderColor: "rgb(138,149,157)",
    borderRadius: 2,
  },
});
