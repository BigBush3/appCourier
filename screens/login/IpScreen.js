import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
} from "react-native";

import * as Font from "expo-font";

import { isIphoneX } from "../../components/isIphoneX.js";

import Colors from "../../constants/Colors.js";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
const statusBarX = isIphoneX() ? 44 : 20;

const statusHeight =
  Platform.OS === "ios" ? statusBarX : StatusBar.currentHeight;
const contentHeight = viewportHeight - statusHeight - 56 - 56;

import { retrieveData, storeData } from "../../services/Storage.js";

import UiModalRadio from "../../components/ui/modal/ModalRadio.js";
import UiTextInput from "../../components/ui/form/TextInput.js";
import Loader from "../../components/ui/Loader.js";
import UiButtonGreen from "../../components/ui/button/ButtonGreen.js";
import UiHeader from "../../components/ui/header/Header.js";
import UiLinkButton from "../../components/ui/button/LinkButton.js";

export default class IpScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    fontsLoaded: false,
    isLoading: true,
    loginProgress: false,
    nameInputFocusValidation: true,
    passwordInputFocusValidation: true,
    selectedUser: "Выберите пользователя",
    modalUserVisible: false,
    modalDateVisible: false,
    usersItemList: [],
  };

  componentDidMount() {
    if (!this.state.fontsLoaded) {
      Font.loadAsync({
        "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
      }).then(() => this.setState({ fontsLoaded: true }));
    } else {
      this.setState({ fontsLoaded: true });
    }

    this.props.navigation.addListener("willFocus", this.load);
  }

  load = () => {
    this.setState({
      fontsLoaded: false,
      isLoading: true,
      loginProgress: false,
      nameInputFocusValidation: true,
      passwordInputFocusValidation: true,
      ip: "172.20.10.3",
    });
    retrieveData("network").then((net) => {
      if (net) {
        this.setState({ ip: net.ip });
        this.props.navigation.navigate("LogIn", { ip: net.ip });
      } else {
      }
    });
  };

  LogIn = (navigate) => {
    if (this.state.ip.length > 5) {
      storeData("network", { ip: this.state.ip });
      this.props.navigation.navigate("LogIn", { ip: this.state.ip });
    } else {
      Alert.alert("Внимание", "Введите IP адресс");
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.fontsLoaded) {
      return <View />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <Loader show={this.state.loginProgress} />
            <UiHeader headerText="Подключение к серверу" />
            <KeyboardAvoidingView
              style={styles.content}
              //behavior="padding"
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.loginBar}>
                  <View style={styles.logoContainer}>
                    <Image
                      style={styles.logo}
                      source={require("../../assets/images/logo_florapoint_mobile.png")}
                    ></Image>
                  </View>

                  <View style={styles.form}>
                    <View style={styles.input}>
                      <UiTextInput
                        backText="IP адрес сервера"
                        type="custom"
                        inputValue={this.state.ip}
                        inputFocus={true}
                        validationType="code6"
                        callBack={(val) => this.setState({ ip: val })}
                      />
                    </View>

                    <UiButtonGreen
                      gButtonText="Войти"
                      disabled={this.state.loginProgress}
                      onPress={() => {
                        this.LogIn(navigate);
                      }}
                    />
                  </View>
                </View>

                <View style={styles.regLink}>
                  <UiLinkButton
                    linkPress={() => {
                      Alert.alert(
                        "Справка",
                        "Если у вас нет соединения то проверьте:\n 1.Подключение телефона к одной сети сервера\n 2.Доступность сервера "
                      );
                    }}
                    linkText="Нет соединения? "
                    linkLink=""
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            {/*
            <UiModalRadio
            subtitle="Выберите пользователя"
            modalChecked={this.state.selectedUser}
            modalItems={this.state.usersItemList}
            modalCallBack={(val) => this.setState({ login: val[1], selectedUser: val[0] })}
            selectFunction={() => { this.setState({ modalUserVisible: !this.state.modalUserVisible }); }}
            modalVisible={this.state.modalUserVisible} />*/}
          </SafeAreaView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  content: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: Colors.whiteColor,
    justifyContent: "space-between",
  },

  scrollContent: {
    width: "100%",
    minHeight: contentHeight,
    paddingVertical: 16,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 280,
    height: 280,
  },
  linksBar: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  linkBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  regLink: {
    width: "100%",
    paddingBottom: 15,
  },

  /* => TextInput Component */
  form: {
    paddingHorizontal: 16,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 22,
    height: 48,
    borderColor: Colors.grayColor,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
  },
  textBlured: {
    borderColor: Colors.blueColor,
  },
  textUnBlured: {
    borderColor: Colors.grayColor,
  },
  inputDanger: {
    borderColor: Colors.redColor,
  },
  warnText: {
    color: Colors.redColor,
    fontSize: 12,
    marginBottom: 8,
    marginTop: -4,
    lineHeight: 18,
    letterSpacing: 0.19,
  },
  hideWarnText: {
    opacity: 0,
    marginTop: -8,
    height: 0,
  },
  buttonTop: {
    position: "absolute",
    height: 48,
    width: 36,
    right: 0,
    top: 0,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  /* => SmallLink Component */
  smallLink: {
    marginTop: -2,
    marginBottom: 16,
    alignItems: "flex-end",
  },
  smallLinkText: {
    color: Colors.darkGrayColor,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.22,
    fontFamily: "Roboto-Regular",
  },

  /* Social Links */
  socialBar: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  orBlock: {
    alignItems: "center",
    marginVertical: 8,
  },
  gosButton: {
    marginVertical: 8,
  },
  logoGosImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 8,
  },
  socialButton: {
    flex: 1,
  },
  socialLink: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 8,
  },
  logoVkImage: {
    resizeMode: "contain",
    width: "80%",
    height: "80%",
  },
  logoFbImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  logoOkImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  gosLink: {
    backgroundColor: Colors.whiteColor,
    borderColor: "#ee3f58",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 8,
    paddingVertical: 16,
  },
  vkLink: {
    backgroundColor: "#4a76a8",
    marginRight: 8,
    paddingVertical: 16,
  },
  fbLink: {
    backgroundColor: "#4267b2",
    marginRight: 8,
    paddingVertical: 14,
  },
  okLink: {
    backgroundColor: "#ee820a",
    paddingVertical: 14,
  },

  /* Link Bar */
  linksBar: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  linkBlock: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  linkBlockText: {
    color: Colors.darkGrayColor,
    fontSize: 14,
    flexWrap: "wrap",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  borderAfter: {
    borderRightWidth: 1,
    borderRightColor: Colors.lightGrayColor,
  },
});
