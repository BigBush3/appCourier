import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

export default class UiPickerButton extends React.Component {
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
      <TouchableOpacity
        style={[
          styles.picker,
          this.props.disabled
            ? { backgroundColor: "#cfcfcf" }
            : { backgroundColor: "#ffffff" },
        ]}
        onPress={this.props.pickerPress}
      >
        <Text style={styles.pickerText}>{this.props.pickerText}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    height: 48,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgb(226,224,229)",
    borderRadius: 8,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  pickerText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 22,
    color: "rgb(138,149,157)",
  },
});
