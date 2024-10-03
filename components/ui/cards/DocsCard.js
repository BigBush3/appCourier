import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";

import docIcon from "../../../assets/images/medcard/doc-2x.png";

export default class UiDocsCard extends React.Component {
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
      <TouchableOpacity
        onPress={this.props.docPress}
        style={[
          styles.docsCard,
          this.props.lastDocument ? styles.lastDocument : null,
        ]}
      >
        <Image style={styles.docsCardIcon} source={docIcon} />

        <View style={styles.docsCardText}>
          <Text style={styles.textTitle}>{this.props.docNumber}</Text>
          <Text style={styles.textDate}>{this.props.docDate}</Text>
          <Text style={styles.textAbout}>{this.props.docAbout}</Text>
          <Text style={styles.textProc}>Склад: {this.props.docStores}</Text>
          {this.props.status ? (
            <Text style={styles.textProc}>Статус: {this.props.status}</Text>
          ) : null}

          {this.props.doc2Stores ? (
            <Text style={styles.textProc}>
              Склад Получатель: {this.props.doc2Stores}
            </Text>
          ) : null}
          {this.props.docInfoSup ? (
            <Text style={styles.textInfo}>
              Поставщик: {this.props.docInfoSup}
            </Text>
          ) : null}
          {this.props.docInfoSt ? (
            <Text style={styles.textInfo}>
              Получатель: {this.props.docInfoSt}
            </Text>
          ) : null}
          <View style={styles.textStatus}>
            <View style={styles.textStatusProv}>
              {this.props.ok == 1 ? (
                <Text style={styles.status}>проведен</Text>
              ) : (
                <Text style={styles.status}>на проведении</Text>
              )}
            </View>
            {this.props.docsCount ? (
              <View style={styles.textStatusDocs}>
                <Text style={styles.statusBlack}>
                  Товаров: {this.props.docsCount} шт.
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          style={styles.docsCardButton}
          onPress={this.props.docEditPress}
        >
          <Ionicons
            style={styles.moreIcon}
            name="more"
            size={26}
            color="rgba(0,0,0,0.38)"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  docsCard: {
    paddingVertical: 8,
    paddingRight: 16,
    marginLeft: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(226,224,229)",
  },
  lastDocument: {
    marginBottom: 60,
  },
  docsCardIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 16,
    marginTop: 8,
    flexGrow: 0,
    flexShrink: 0,
  },
  docsCardText: {
    flexGrow: 1,
    flexShrink: 1,
  },
  textTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(16,0,43)",
    marginBottom: 2,
  },
  textAbout: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(16,0,43)",
  },
  textProc: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "rgb(138,149,157)",
  },
  textDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.25,
    color: "rgb(138,149,157)",
  },
  textInfo: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "rgb(138,149,157)",
  },
  docsCardButton: {
    width: 24,
    height: 24,
    marginTop: 8,
    flexGrow: 0,
    flexShrink: 0,
  },
  textStatus: {
    marginTop: 8,
    flexDirection: "row",
  },
  textStatusProv: {
    backgroundColor: "#8db63b",
    paddingHorizontal: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  status: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.25,
    color: "rgb(255,255,255)",
  },
  textStatusDocs: {
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  statusBlack: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.25,
    color: "rgb(16,0,43)",
  },
});
