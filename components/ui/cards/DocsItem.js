import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import * as Font from "expo-font";

import docIcon from "../../../assets/images/medcard/doc-2x.png";
import docxIcon from "../../../assets/images/medcard/docx-2x.png";
import pdfIcon from "../../../assets/images/medcard/pdf-2x.png";
import xlsxIcon from "../../../assets/images/medcard/xlsx-2x.png";
import saveIcon from "../../../assets/images/medreg/save-2x.png";

export default class UiDocsItem extends React.Component {
  state = {
    fontsLoaded: false,
  };

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
      <TouchableOpacity style={[styles.docsItem]} onPress={this.state.docPress}>
        {this.props.docType == 1 ? (
          <Image style={styles.docsItemImage} source={docIcon} />
        ) : null}
        {this.props.docType == 2 ? (
          <Image style={styles.docsItemImage} source={docxIcon} />
        ) : null}
        {this.props.docType == 3 ? (
          <Image style={styles.docsItemImage} source={pdfIcon} />
        ) : null}
        {this.props.docType == 4 ? (
          <Image style={styles.docsItemImage} source={xlsxIcon} />
        ) : null}
        <Text
          style={styles.docsItemText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {this.props.docName}
        </Text>
        <Image source={saveIcon} style={styles.docsItemSave} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  docsItem: {
    height: 48,
    marginLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(226,224,229)",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  docsItemImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 16,
    flexGrow: 0,
    flexShrink: 0,
  },
  docsItemText: {
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(16,9,43)",
  },
  docsItemSave: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginLeft: 16,
    flexGrow: 0,
    flexShrink: 0,
  },
});
