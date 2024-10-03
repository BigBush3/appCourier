import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

import filterIcon from "../../../assets/images/ui/sort-2x.png";
import filterActiveIcon from "../../../assets/images/ui/filterActive-2x.png";

export default class UiFilterLineButton extends React.Component {
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
      <View style={styles.filter}>
        <Text style={styles.filterText}>{this.props.filterText}</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={this.props.filterPress}
        >
          <Image style={styles.filterIcon} source={filterIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filter: {
    height: 48,
    paddingLeft: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(245,245,245)",
  },
  filterText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(138,149,157)",
    flexGrow: 1,
    flexShrink: 1,
  },
  filterButton: {
    width: 56,
    height: 42,
    flexGrow: 0,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
