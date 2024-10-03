import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";

import * as Font from "expo-font";

import { isIphoneX } from "../../isIphoneX";

const statusHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const statusX = isIphoneX() ? 30 : 0;
const headerTop = statusHeight + statusX;
const heightHeader = 56 + headerTop;

export default class UiHeaderSubtitle extends React.Component {
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
      <View style={[styles.header, { borderColor: this.props.underColor }]}>
        <TouchableOpacity onPress={this.props.leftPress} style={styles.button}>
          <Text style={styles.buttonText}>{this.props.leftTitle}</Text>
        </TouchableOpacity>
        <View style={styles.text}>
          <Text style={styles.title}>{this.props.headerTitle}</Text>
          <Text style={styles.subtitle}>{this.props.headerSubtitle}</Text>
        </View>
        {this.props.rightPress ? (
          <TouchableOpacity
            onPress={this.props.rightPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{this.props.rightTitle}</Text>
          </TouchableOpacity>
        ) : null}
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
    borderBottomWidth: 1,
    backgroundColor: "#8db63b",
  },
  button: {
    minWidth: 56,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  buttonImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  buttonText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Roboto-Regular",
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Roboto-Medium",
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "Roboto-Regular",
  },
});
