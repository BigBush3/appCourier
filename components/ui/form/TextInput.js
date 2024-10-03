import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import * as Font from "expo-font";

import { ValidateInput } from "../../../components/common/Validator.js";

export default class UiTextInput extends React.Component {
  state = {
    fontsLoaded: false,
    inputValidation: true,
    inputValidationVal: "",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));
  }

  componentWillUnmount() {}

  shouldComponentUpdate(nProps, nState) {
    if (nProps.clear != undefined && nProps.clear) {
      this.textInput.clear();
      this.setState({ validationType: "" });
      this.props.clearCallBack(false);
    }
    if (
      this.props.inputValue &&
      this.props.inputValue != undefined &&
      nProps.inputValue !== this.props.inputValue
    ) {
      //console.log( nProps.inputValue !== this.props.inputValue, nProps.inputValue , this.props.inputValue)
      this.handlerValidation(
        "inputValidation",
        this.props.validationType,
        nProps.inputValue
      );
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
      this.state.inputValidationVal
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
          ]}
          ref={(input) => {
            this.textInput = input;
          }}
          placeholder={this.props.backText}
          placeholderTextColor="rgb(138,149,157)"
          autoCapitalize={this.props.capitalizeText}
          autoFocus={this.props.inputFocus}
          keyboardType={this.props.activeKeyboard}
          maxLength={this.props.textLength}
          secureTextEntry={this.props.hiddenPass}
          textContentType={this.props.textInputType}
          allowFontScaling={false}
          editable={this.props.editable}
          multiline={this.props.lines}
          numberOfLines={this.props.linesNumber}
          value={this.props.inputValue}
          onChangeText={(value) => {
            this.setState({
              ["inputValidationVal"]: value,
            });

            if (this.props.callBack) this.props.callBack(value);
            if (this.props.callBackValidation)
              this.props.callBackValidation(this.state.inputValidation);
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
          {this.state.inputValidationVal.length == 0 ? "Заполните поле" : ""}
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
