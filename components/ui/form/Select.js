import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

import selectIcon from "../../../assets/images/ui/rectangle-2x.png";

export default class UiSelect extends React.Component {
  state = {
    fontsLoaded: false,
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
      <TouchableOpacity style={styles.select} onPress={this.props.onSelect}>
        {this.props.optionText ? (
          <Text
            style={styles.optionText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {this.props.optionText}
          </Text>
        ) : (
          <Text
            style={styles.selectText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {this.props.selectText}
          </Text>
        )}
        <Image style={styles.selectImage} source={selectIcon} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  select: {
    height: 48,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgb(226,224,229)",
    borderRadius: 8,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  selectText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 22,
    color: "rgb(138,149,157)",
    flexGrow: 1,
    flexShrink: 1,
  },
  optionText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 22,
    color: "rgb(16,0,43)",
    flexGrow: 1,
    flexShrink: 1,
  },
  selectImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    flexGrow: 0,
    flexShrink: 0,
  },
});
