import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";

import * as Font from "expo-font";

import radioImage from "../../../assets/images/ui/radio-2x.png";
import radioActiveImage from "../../../assets/images/ui/radiocheck-2x.png";

export default class UiRadioBox extends React.Component {
  state = {
    fontsLoaded: false,
    radioBoxActive: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));

    if (this.props.defaultValue)
      this.setState({ radioBoxActive: this.props.defaultValue });
  }

  setValue = (value) => {
    this.setState({ radioBoxActive: value });
    this.props.callBack(value);
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }

    var List = this.props.itemList.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setValue(item.value);
          }}
          style={[
            styles.radioBoxInner,
            index === this.props.itemList.length - 1 ? styles.lastInner : null,
          ]}
          key={index}
        >
          <Text style={styles.radioBoxText}>{item.title}</Text>
          {Platform.OS == "ios" ? (
            <View style={styles.radioBoxButton}>
              {this.state.radioBoxActive != item.value ? (
                <Image source={radioImage} style={styles.radioBoxImage} />
              ) : (
                <Image source={radioActiveImage} style={styles.radioBoxImage} />
              )}
            </View>
          ) : (
            <View style={styles.radioBoxButton}>
              {this.state.radioBoxActive != item.value ? (
                <Image source={radioImage} style={styles.radioBoxImage} />
              ) : (
                <Image source={radioActiveImage} style={styles.radioBoxImage} />
              )}
            </View>
          )}
        </TouchableOpacity>
      );
    });

    return <View style={styles.radioBox}>{List}</View>;
  }
}

const styles = StyleSheet.create({
  radioBox: {
    borderWidth: 1,
    borderColor: "rgb(226,224,229)",
    borderRadius: 8,
    marginBottom: 8,
  },
  radioBoxInner: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(226,224,229)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  lastInner: {
    borderBottomWidth: 0,
  },
  radioBoxButton: {
    width: 24,
    height: 24,
    flexGrow: 0,
    flexShrink: 0,
  },
  radioBoxImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  radioBoxText: {
    flexGrow: 1,
    flexShrink: 1,
    color: "rgb(16,0,43)",
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Roboto-Regular",
  },
});
