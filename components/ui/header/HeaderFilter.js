import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";
import { isIphoneX } from "../../isIphoneX";

import arrowBack from "../../../assets/images/ui/arrowBack-2x.png";
import closeBack from "../../../assets/images/ui/close-2x.png";
import editBack from "../../../assets/images/ui/icon-edit-2x.png";
import searchClear from "../../../assets/images/ui/searchClear-2x.png";

const statusHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const statusX = isIphoneX() ? 30 : 0;
const headerTop = statusHeight + statusX;
const heightHeader = 56;

export default class UiHeaderFilter extends React.Component {
  state = {
    fontsLoaded: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));
  }

  search(val) {
    var sKey = this.props.searchKey.split(".");

    var resArr = [];
    this.props.specialist.map((item, index) => {
      if (sKey.length == 1) {
        var addr = item[sKey[0]].toLowerCase();
      } else if (sKey.length == 2) {
        var addr = item[sKey[0]][sKey[1]].toLowerCase();
      }

      if (addr.indexOf(val.toLowerCase()) !== -1) resArr.push(item);
    });

    this.props.callBack(resArr);
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }
    return (
      <View style={styles.headerView}>
        <View
          style={[
            styles.header,
            this.state.searchVisible ? styles.lightHeader : null,
            { borderColor: this.props.underline },
          ]}
        >
          {!this.state.searchVisible ? (
            <TouchableOpacity
              onPress={this.props.pressLeft}
              style={styles.button}
            >
              {this.props.btnLeft == "back" ? (
                <Image source={arrowBack} style={styles.buttonImage} />
              ) : null}
              {this.props.btnLeft == "close" ? (
                <Image source={closeBack} style={styles.buttonImage} />
              ) : null}
              {this.props.btnLeft == "add" ? (
                <Image source={editBack} style={styles.buttonImage} />
              ) : null}
            </TouchableOpacity>
          ) : null}
          {!this.state.searchVisible ? (
            <View style={styles.searchHide}>
              <Text style={styles.title}>{this.props.headerText}</Text>
            </View>
          ) : (
            <View style={styles.searchShow}>
              <TextInput
                style={styles.headerInput}
                placeholder={
                  this.props.searchTitle ? this.props.searchTitle : "Поиск"
                }
                placeholderTextColor="rgb(138,149,157)"
                onChangeText={(res) => {
                  this.search(res);
                }}
              />
            </View>
          )}
          {!this.state.searchVisible ? (
            <TouchableOpacity
              onPress={() =>
                this.setState({ searchVisible: !this.state.searchVisible })
              }
              style={styles.button}
            >
              <Ionicons
                style={styles.backIcon}
                name={this.props.headerRight}
                size={26}
                color="#fff"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ searchVisible: !this.state.searchVisible });
                if (this.props.callBackSearch)
                  this.props.callBackSearch(!this.state.searchVisible);
              }}
            >
              <Image source={searchClear} style={styles.buttonImage} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    width: "100%",
    backgroundColor: "#8db63b",
  },
  header: {
    width: "100%",
    height: heightHeader,
    marginTop: headerTop,
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    backgroundColor: "#8db63b",
  },
  lightHeader: {
    backgroundColor: "#fff",
  },
  button: {
    minWidth: 56,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Roboto-Medium",
  },

  searchShow: {
    alignItems: "flex-start",
    width: "100%",
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#fff",
  },
  headerInput: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "rgb(16,0,43)",
    flexGrow: 1,
    flexShrink: 1,
    width: "100%",
    paddingLeft: 16,
  },
});
