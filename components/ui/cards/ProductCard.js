import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import {
  Fontisto,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

import * as Font from "expo-font";

import Colors from "../../../constants/Colors.js";

export default class UiProductCard extends React.Component {
  state = {
    fontsLoaded: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <TouchableOpacity
        style={[
          styles.productCard,
          this.props.lastProduct ? styles.lastProduct : null,
        ]}
        onPress={this.props.onPress}
      >
        <View style={styles.numRow}>
          <Text style={styles.numText}>№ {this.props.number}</Text>
        </View>

        <View style={styles.magazinRow}>
          <Fontisto
            name="shopping-store"
            size={14}
            style={[styles.icon]}
            color={Colors.blackColor}
          />
          <Text style={styles.magazinText}>{this.props.title}</Text>
        </View>

        <View style={styles.row}>
          <View style={(styles.row, styles.halfrow)}>
            <MaterialIcons
              name="insert-invitation"
              size={12}
              style={[styles.icon]}
              color={Colors.darkGrayColor}
            />
            <Text style={styles.dataText}>{this.props.date}</Text>
          </View>
          <View style={(styles.row, styles.halfrow)}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={12}
              style={[styles.icon]}
              color={Colors.darkGrayColor}
            />
            <Text style={styles.timeText}>{this.props.time}</Text>
          </View>
        </View>

        <View style={styles.adressRow}>
          <Entypo
            name="location"
            size={12}
            style={[styles.icon]}
            color={Colors.darkGrayColor}
          />
          <Text style={styles.adressText}>{this.props.adress}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 8,
    marginTop: 8,
    padding: 16,
  },

  numText: {
    color: Colors.greenColor,
    fontSize: 14,
  },

  magazinText: {
    color: Colors.blackColor,
    fontSize: 14,
  },

  dataText: {
    color: Colors.darkGrayColor,
    fontSize: 12,
  },

  timeText: {
    color: Colors.darkGrayColor,
    fontSize: 12,
  },

  adressText: {
    color: Colors.darkGrayColor,
    fontSize: 12,
  },

  icon: {
    marginRight: 8,
  },

  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  halfrow: {
    flex: 1,
    height: 12,
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: '#faf',
  },

  numRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: 'black',
    marginTop: 4,
    marginBottom: 20,
  },

  magazinRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: 'red',
    marginBottom: 10,
  },

  adressRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: Colors.greenColor,
    marginTop: 22,
    marginBottom: 4,
  },
});
