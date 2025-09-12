import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import {
  Fontisto,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

import {
  convertColorToHex,
  getTextColorForBackground,
} from "../../../utils/index.js";

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

        {this.props.statusName ? (
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: convertColorToHex(this.props.statusColor),
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color: getTextColorForBackground(
                      convertColorToHex(this.props.statusColor)
                    ),
                  },
                ]}
              >
                {this.props.statusName}
              </Text>
            </View>
          </View>
        ) : null}

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

        {this.props.courierName ? (
          <View style={styles.courierRow}>
            <MaterialIcons
              name="person"
              size={12}
              style={[styles.icon]}
              color={Colors.darkGrayColor}
            />
            <Text style={styles.courierText}>
              Курьер: {this.props.courierName}
            </Text>
          </View>
        ) : null}
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

  courierText: {
    color: Colors.darkGrayColor,
    fontSize: 12,
    fontWeight: "bold",
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
    height: 20,
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

  courierRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 4,
  },

  statusRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.blackColor,
  },
});
