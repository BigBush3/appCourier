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

export default class UiAlertFace extends React.Component {
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
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modal}
          onPress={this.props.cancelPress}
        >
          <View style={styles.modalAlert}>
            <Image
              source={this.props.alertImage}
              style={styles.alertIconImage}
            />
            <Text style={styles.modalAlertText}>{this.props.alertText}</Text>
          </View>
        </TouchableOpacity>
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
    width: 136,
    height: 136,
    borderRadius: 14,
    backgroundColor: "rgb(213,213,213)",
    alignItems: "center",
    justifyContent: "center",
  },
  alertIconImage: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    marginBottom: 18,
  },
  modalAlertText: {
    fontFamily: "SFUIText-Regular",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: "rgb(0,0,0)",
  },
});
