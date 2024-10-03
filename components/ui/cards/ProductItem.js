import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

import * as Font from "expo-font";

import chevronRight from "../../../assets/images/ui/chevronRight-2x.png";
import itemImage from "../../../assets/images/ui/read-2x.png";

export default class UiProductItem extends React.Component {
  state = { fontsLoaded: false };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Regular": require("../../../assets/fonts/Roboto-Medium.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }

    return (
      <TouchableHighlight
        underlayColor="rgb(245,245,245)"
        style={styles.navItem}
        onPress={this.props.onPress}
      >
        <View style={styles.navItemInner}>
          <Image style={styles.navItemImage} source={itemImage} />
          <Text style={styles.navItemText}>{this.props.itemText}</Text>
          <Image style={styles.navItemIcon} source={chevronRight} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  navItem: {
    backgroundColor: "#fff",
    height: 56,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  navItemInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navItemImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 16,
    flexGrow: 0,
    flexShrink: 0,
  },
  navItemText: {
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    lineHeight: 22,
    color: "rgb(16,0,43)",
  },
  navItemIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
