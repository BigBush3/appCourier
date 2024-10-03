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

import searchClear from "../../../assets/images/ui/searchClear-2x.png";
import arrowBack from "../../../assets/images/ui/arrowBack-2x.png";
import closeBack from "../../../assets/images/ui/close-2x.png";

import { isIphoneX } from "../../isIphoneX";

const statusHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const statusX = isIphoneX() ? 30 : 0;
const headerTop = statusHeight + statusX;
const heightHeader = 56 + headerTop;

export default class UiHeaderSearch extends React.Component {
  state = {
    fontsLoaded: false,
    searchVisible: false,
    searchRes: [],
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
    var resArr = [];
    this.props.markers.map((item, index) => {
      var addr = item.address.toLowerCase();
      if (addr.indexOf(val.toLowerCase()) !== -1) resArr.push(item);
    });
    this.setState({ searchRes: resArr });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }
    var items = this.state.searchRes.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.resultListCard}
          onPress={() => {
            this.props.callBack(item);
            this.setState({
              searchRes: [],
              searchVisible: !this.state.searchVisible,
            });
          }}
        >
          <Text style={styles.listCardTitle}>{item.filialName}</Text>
          <Text style={styles.listCardText}>{item.address}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <View style={styles.headerView}>
        <View style={[styles.header, { borderColor: this.props.underline }]}>
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
          </TouchableOpacity>
          {!this.state.searchVisible ? (
            <View style={styles.searchHide}>
              <Text style={styles.title}>{this.props.headerText}</Text>
            </View>
          ) : (
            <View style={styles.searchShow}>
              <TextInput
                style={styles.headerInput}
                onChangeText={(res) => {
                  this.search(res);
                }}
                placeholder="Поиск по району или городу"
                placeholderTextColor="rgb(138,149,157)"
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
                color="rgb(16,0,43)"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.setState({
                  searchRes: [],
                  searchVisible: !this.state.searchVisible,
                })
              }
            >
              <Image source={searchClear} style={styles.buttonImage} />
            </TouchableOpacity>
          )}
        </View>

        {this.state.searchRes.length > 0 ? (
          <View style={styles.searchResult}>
            {/*<View style={styles.noResult}>
              <Text style={styles.noResultText}>Не найдено</Text>
            </View>*/}

            <View style={styles.resultList}>{items}</View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    width: "100%",
  },
  header: {
    width: "100%",
    height: heightHeader,
    paddingTop: headerTop,
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
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
    color: "#10002b",
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Roboto-Medium",
  },

  searchShow: {
    alignItems: "flex-start",
    width: "100%",
    flexGrow: 1,
    flexShrink: 1,
  },
  headerInput: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "rgb(16,0,43)",
    width: "100%",
  },

  searchResult: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  noResult: {
    paddingTop: 65,
    alignItems: "center",
  },
  noResultText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 22,
    color: "rgb(138,149,157)",
  },

  resultList: {
    width: "100%",
  },
  resultListCard: {
    marginLeft: 16,
    paddingRight: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(226,224,229)",
  },
  listCardTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(16,0,43)",
    marginBottom: 4,
  },
  listCardText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(138,149,157)",
  },
});
