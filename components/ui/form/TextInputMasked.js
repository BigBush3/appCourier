import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import * as Font from "expo-font";

import { ValidateInput } from "../../../components/common/Validator.js";
import { TextInputMask } from "react-native-masked-text";

export default class UiTextInputMasked extends React.Component {
  state = {
    fontsLoaded: false,
    inputValidation: true,
    dt: "",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));

    this.setState({ dt: "" });
  }

  shouldComponentUpdate(nProps, nState) {
    if (nProps.clear != undefined && nProps.clear) {
      console.log("upd");
      this.setState({ inputValidation: true, validationType: "", dt: "" });
      this.props.clearCallBack(false);
    }
    return true;
  }

  handlerFocus = (input) => {
    this.setState({
      [input]: true,
    });
  };

  handlerBlur = (input) => {
    this.handlerValidation(
      "inputValidation",
      this.props.validationType,
      this.state.dt
    );
    this.setState({
      [input]: false,
    });
  };

  handlerValidation = (input, key, value) => {
    this.setState({
      [input]: ValidateInput(key, value),
    });
    this.props.callBack(value);
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }

    return (
      <View style={styles.input}>
        <TextInputMask
          style={[
            !this.props.style ? styles.textInput : this.props.style,
            this.state.inputFocus ? styles.textBlured : "",
            !this.state.inputValidation ? styles.inputDanger : "",
          ]}
          refInput={(ref) => {
            this.TextInputMask = ref;
          }}
          type={this.props.type}
          options={this.props.format}
          value={
            this.state.dt == "" && this.props.inputValue
              ? this.props.inputValue
              : this.state.dt
          }
          onChangeText={(text) => {
            this.setState({
              dt: text,
            });
            this.setState({
              ["inputValidation"]: text,
            });
            if (this.props.inputFocus) this.props.callBack(text);
            if (this.props.callBackValidation)
              this.props.callBackValidation(this.state.inputValidation);
          }}
          onFocus={() => this.handlerFocus("inputFocus")}
          onBlur={() => this.handlerBlur("inputFocus")}
          placeholder={this.props.backText}
          placeholderTextColor="rgb(138,149,157)"
          autoCapitalize={this.props.capitalizeText}
          autoFocus={this.props.inputFocus}
          keyboardType={this.props.activeKeyboard}
          maxLength={this.props.textLength}
          secureTextEntry={this.props.hiddenPass}
          textContentType={this.props.textInputType}
          allowFontScaling={false}
          multiline={this.props.lines}
          numberOfLines={this.props.linesNumber}
        />

        <Text
          style={[
            styles.warnText,
            this.state.inputValidation ? styles.hideWarnText : "",
          ]}
        >
          Неверные данные
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    lineHeight: 22,
    color: "rgb(16,0,43)",
    height: 48,
    backgroundColor: "#fff",
    borderColor: "rgb(226,224,229)",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
  },
  textBlured: {
    borderColor: "#8db63b",
  },
  inputDanger: {
    borderColor: "rgb(252,63,63)",
  },
  warnText: {
    color: "rgb(252,63,63)",
    fontSize: 12,
    marginBottom: 8,
    marginTop: -4,
    lineHeight: 18,
    letterSpacing: 0.19,
    fontFamily: "Roboto-Regular",
  },
  hideWarnText: {
    opacity: 0,
    marginTop: -8,
    height: 0,
  },
});
