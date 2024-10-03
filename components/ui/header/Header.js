import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";

import { isIphoneX } from "../../isIphoneX";

import arrowBack from "../../../assets/images/ui/arrowBack-2x.png";
import closeBack from "../../../assets/images/ui/close-2x.png";

const statusHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const statusX = isIphoneX() ? 30 : 0;
const headerTop = statusHeight + statusX;
const heightHeader = 56 + headerTop;

export default class UiHeader extends React.Component {
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
      <View style={[styles.header, { borderColor: this.props.underline }]}>
        <TouchableOpacity onPress={this.props.pressLeft} style={styles.button}>
          {this.props.btnLeft == "back" ? (
            <Image source={arrowBack} style={styles.buttonImage} />
          ) : null}
          {this.props.btnLeft == "close" ? (
            <Image source={closeBack} style={styles.buttonImage} />
          ) : null}
        </TouchableOpacity>

        <Text style={styles.title}>{this.props.headerText}</Text>

        <TouchableOpacity onPress={this.props.pressRight} style={styles.button}>
          <Text></Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: heightHeader,
    paddingTop: headerTop,
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //borderBottomWidth: 1,
    backgroundColor: "#8db63b",
  },
  button: {
    minWidth: 56,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Roboto-Medium",
  },
});
