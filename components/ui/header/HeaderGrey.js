import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

import nearIcon from "../../../assets/images/ui/near-2x.png";
import dotsMenu from "../../../assets/images/ui/dots-2x.png";

export default class UiHeaderGrey extends React.Component {
  state = { fontsLoaded: false };

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
      <View style={styles.header}>
        {!this.props.noButton ? (
          <TouchableOpacity
            onPress={this.props.pressGrey}
            style={styles.greyBtn}
          >
            {this.props.greyBtnText ? (
              <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                <Image source={nearIcon} style={styles.greyBtnIcon} />
                <Text style={styles.greyBtnText}>{this.props.greyBtnText}</Text>
              </View>
            ) : (
              <Image source={dotsMenu} style={styles.greyBtnIcon} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 56,
    marginTop: headerTop,
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  greyBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
  },
  greyBtnIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 8,
  },
  greyBtnText: {
    color: "rgb(138,149,157)",
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    lineHeight: 20,
    paddingRight: 8,
  },
});
