import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import * as Font from "expo-font";
import { ValidateInput } from "../../../components/common/Validator.js";

import { getAdressAutocompleat } from "../../../services/Adress.js";

export default class UiTextInputAddress extends React.Component {
  state = {
    fontsLoaded: false,
    inputValidation: true,
    list: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));

    this.fetchTrans();
  }

  componentWillUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.fetchTrans();
    }
    return true;
  }

  fetchTrans() {
    getAdressAutocompleat(this.props.search)
      .then((res) => {
        this.setState({ list: res.predictions });
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }

    var list = this.state.list.map((item, index) => {
      if (index < 3 && this.props.search != "" && this.props.showHint) {
        return (
          <TouchableOpacity
            key={index}
            style={styles.searchItem}
            onPress={() => {
              this.props.callBack(item.description);
            }}
          >
            <Text style={styles.searchItemText}>{item.description}</Text>
          </TouchableOpacity>
        );
      } else {
        return null;
      }
    });

    return (
      <View
        style={[
          styles.searchList,
          { top: this.props.searchTop },
          { position: this.props.position ? this.props.position : "absolute" },
        ]}
      >
        {list}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchList: {
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  searchItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexWrap: "wrap",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(226,224,229)",
  },
  searchItemText: {
    fontSize: 16,
    lineHeight: 22,
    color: "rgb(16,0,43)",
    flexWrap: "wrap",
  },
});
