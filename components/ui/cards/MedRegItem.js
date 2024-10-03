import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

import attachFile from "../../../assets/images/medreg/attachFile-2x.png";
import doctorIcon from "../../../assets/images/medreg/doctor-2x.png";
import telemedIcon from "../../../assets/images/medreg/telemed-2x.png";

export default class UiMedRegItem extends React.Component {
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
      <TouchableOpacity
        style={styles.medRegItem}
        onPress={this.props.regItemPress}
      >
        {this.props.registrationType == 1 ? (
          <Image style={styles.medRegItemImage} source={telemedIcon} />
        ) : null}
        {this.props.registrationType == 2 ? (
          <Image style={styles.medRegItemImage} source={doctorIcon} />
        ) : null}
        <View style={styles.medRegItemInner}>
          {this.props.regStatus == 1 ? (
            <Text
              style={[styles.medRegItemStatus, { color: "rgb(138,149,157)" }]}
            >
              Консультация еще не началась
            </Text>
          ) : null}
          {this.props.regStatus == 2 ? (
            <Text
              style={[styles.medRegItemStatus, { color: "rgb(23,174,135)" }]}
            >
              Консультация началась
            </Text>
          ) : null}
          {this.props.regStatus == 3 ? (
            <Text
              style={[styles.medRegItemStatus, { color: "rgb(0,112,201)" }]}
            >
              До закрытия чата осталось {this.props.timeStatus}
            </Text>
          ) : null}
          {this.props.regStatus == 4 ? (
            <Text
              style={[
                styles.medRegItemStatus,
                { color: "rgba(252,63,63,0.87)" },
              ]}
            >
              Чат закрыт
            </Text>
          ) : null}
          <Text style={styles.medRegItemDoctor}>{this.props.regDoctor}</Text>
          <View style={styles.medRegItemBottom}>
            <Text style={styles.medRegItemDate}>{this.props.regDate}</Text>
            {this.props.regFiles ? (
              <View style={styles.medRegItemFiles}>
                <Image style={styles.filesImage} source={attachFile} />
                <Text style={styles.filesNumber}>{this.props.regFiles}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  medRegItem: {
    marginLeft: 16,
    paddingTop: 8,
    paddingBottom: 9,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(226,224,229)",
    flexDirection: "row",
  },
  medRegItemImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginTop: 8,
    marginRight: 16,
    flexGrow: 0,
    flexShrink: 0,
  },
  medRegItemInner: {
    flexGrow: 1,
    flexShrink: 1,
  },
  medRegItemStatus: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    lineHeight: 18,
  },
  medRegItemDoctor: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(16,0,43)",
  },
  medRegItemBottom: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  medRegItemDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.25,
    color: "rgb(138,149,157)",
  },
  medRegItemFiles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  filesImage: {
    width: 14,
    height: 14,
    resizeMode: "contain",
    marginRight: 4,
  },
  filesNumber: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.25,
    color: "rgb(138,149,157)",
  },
});
