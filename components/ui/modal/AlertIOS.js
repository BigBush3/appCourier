import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import * as Font from "expo-font";

export default class UiAlertIOS extends React.Component {
  state = { fontsLoaded: false };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Font.loadAsync({
      "SFUIText-Semibold": require("../../../assets/fonts/SFUIText-Semibold.ttf"),
      "SFUIText-Regular": require("../../../assets/fonts/SFUIText-Regular.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <View />;
    }
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalAlert}>
            {!this.props.alertImage ? null : (
              <Image
                source={this.props.alertImage}
                style={styles.alertIconImage}
              />
            )}
            {!this.props.alertTitle ? null : (
              <Text style={styles.modalAlertTitle}>
                {this.props.alertTitle}
              </Text>
            )}
            <Text style={styles.modalAlertText}>{this.props.alertText}</Text>
            <View style={styles.modalAlertButtons}>
              {!this.props.okPress ? null : (
                <TouchableOpacity
                  style={[styles.button, { paddingHorizontal: 20 }]}
                  onPress={this.props.okPress}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { fontFamily: "SFUIText-Semibold" },
                    ]}
                  >
                    Повторить Face ID
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, { paddingHorizontal: 12 }]}
                onPress={this.props.cancelPress}
              >
                <Text style={styles.buttonText}>Отменить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalAlert: {
    width: 270,
    borderRadius: 14,
    backgroundColor: "rgb(213,213,213)",
    paddingTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  alertIconImage: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    marginBottom: 16,
  },
  modalAlertTitle: {
    fontFamily: "SFUIText-Semibold",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "rgb(0,0,0)",
    marginBottom: 8,
    paddingHorizontal: 16,
    textAlign: "center",
  },
  modalAlertText: {
    fontFamily: "SFUIText-Regular",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.08,
    color: "rgb(0,0,0)",
    marginBottom: 10,
    paddingHorizontal: 16,
    textAlign: "center",
    minHeight: 32,
  },
  modalAlertButtons: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    height: 44.5,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#c8c7cc",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "SFUIText-Regular",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "rgb(0,122,255)",
  },
});
