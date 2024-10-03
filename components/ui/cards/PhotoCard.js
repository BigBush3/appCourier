import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import { Ionicons, Entypo } from "@expo/vector-icons";
import Colors from "../../../constants/Colors.js";

import * as Font from "expo-font";

export default class UiPhotoCard extends React.Component {
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
      <View style={styles.cardWrap}>
        <View style={styles.photoCard}>
          <Image
            style={styles.productImage}
            source={{
              uri:
                "http://" +
                this.props.ip +
                "/ibm/public/images/" +
                this.props.img,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.photoCardClose}
          onPress={this.props.delete}
        >
          <Entypo name="cross" size={14} color={Colors.whiteColor} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrap: {
    width: 108,
    height: 108,
    marginBottom: 16,
    paddingTop: 8,
    paddingRight: 8,
  },

  photoCard: {
    width: 100,
    height: 100,
    backgroundColor: Colors.lightGrayColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  photoCardClose: {
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.redColor,
    textAlign: "center",
  },

  productImage: {
    flexGrow: 0,
    flexShrink: 0,
    width: 132,
    height: 132,
    marginRight: 8,
    borderRadius: 8,
  },
});
