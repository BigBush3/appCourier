import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

import arrowLeft from "../../../assets/images/polisnew/arrowLeft-2x.png";
import arrowRight from "../../../assets/images/polisnew/arrowRight-2x.png";

export default class UiNavBottom extends React.Component {
  state = {
    fontsLoaded: false,
    prewVisible: false,
    nextVisible: false,
    activeDot: 1,
  };

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
      <View style={styles.navBottom}>
        {this.props.prewVisible == true ? (
          <TouchableOpacity
            style={[styles.button, { justifyContent: "flex-start" }]}
            onPress={this.props.prewPress}
          >
            <Image source={arrowLeft} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Назад</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonEmpty}></View>
        )}
        <View style={styles.dots}>
          <View
            style={[
              styles.dot,
              this.props.activeDot == 1 ? styles.dotActive : null,
            ]}
          ></View>
          <View
            style={[
              styles.dot,
              this.props.activeDot == 2 ? styles.dotActive : null,
            ]}
          ></View>
          <View
            style={[
              styles.dot,
              this.props.activeDot == 3 ? styles.dotActive : null,
            ]}
          ></View>
          <View
            style={[
              styles.dot,
              this.props.activeDot == 4 ? styles.dotActive : null,
            ]}
          ></View>
          <View
            style={[
              styles.dot,
              this.props.activeDot == 5 ? styles.dotActive : null,
            ]}
          ></View>
        </View>
        {this.props.nextVisible == true ? (
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonDisabled,
              { justifyContent: "flex-end" },
            ]}
            onPress={this.props.nextPress}
          >
            <Text style={styles.buttonText}>Далее</Text>
            <Image source={arrowRight} style={styles.buttonIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, { justifyContent: "flex-end" }]}
            onPress={this.props.issuePress}
          >
            <Text style={styles.buttonText}>Оформить</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBottom: {
    backgroundColor: "rgb(16,0,43)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    width: "100%",
    paddingHorizontal: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
  },
  buttonEmpty: {
    width: 100,
  },
  buttonDisabled: {
    opacity: 0.38,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  buttonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: "rgb(255,255,255)",
    marginHorizontal: 8,
  },
  dots: {
    flexDirection: "row",
  },
  dot: {
    width: 8,
    height: 8,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    opacity: 0.24,
  },
  dotActive: {
    opacity: 1,
  },
});
