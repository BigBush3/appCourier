import React from "react";
import { StyleSheet, Text, View, TextInput, Platform } from "react-native";

import * as Font from "expo-font";

import { ValidateInput } from "../../../components/common/Validator.js";

export default class UiTextInputLines extends React.Component {
  state = {
    fontsLoaded: false,
    inputValidation: true,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));
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
      this.state.inputValidation
    );
    this.setState({
      [input]: false,
    });
  };

  handlerValidation = (input, key, value) => {
    this.setState({
      [input]: ValidateInput(key, value),
    });
    //this.props.callBack(value);
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }

    return (
      <View style={styles.input}>
        <TextInput
          style={[
            styles.textInput,
            this.state.inputFocus ? styles.textBlured : "",
            !this.state.inputValidation ? styles.inputDanger : "",
            { textAlignVertical: "top" },
          ]}
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
          value={this.props.inputValue}
          onChangeText={(value) => {
            this.setState({
              ["inputValidation"]: value,
            });
            if (this.props.callBack) this.props.callBack(value);
          }}
          onFocus={() => this.handlerFocus("inputFocus")}
          onBlur={() => this.handlerBlur("inputFocus")}
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
    color: "rgb(16,0,43)",
    height: 96,
    borderColor: "rgb(226,224,229)",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom: 13,
    fontFamily: "Roboto-Regular",
  },
  textBlured: {
    borderColor: "rgb(2,177,169)",
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
