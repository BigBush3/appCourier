import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";

import Colors from "../../constants/Colors.js";

import { isIphoneX } from "../../components/isIphoneX.js";

import { checkLoginCourier } from "../../services/SignIn.js";
import { getAll, getUserAccess } from "../../services/User.js";
import { storeData } from "../../services/Storage.js";

import UiModalRadio from "../../components/ui/modal/ModalRadio.js";
import Loader from "../../components/ui/Loader.js";
import UiButtonGreen from "../../components/ui/button/ButtonGreen.js";
import UiHeader from "../../components/ui/header/Header.js";
import UiLinkButton from "../../components/ui/button/LinkButton.js";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
const statusBarX = isIphoneX() ? 44 : 20;
const statusBarIndent =
  Platform.OS === "ios" ? statusBarX : StatusBar.currentHeight;
const statusHeight =
  Platform.OS === "ios" ? statusBarX : StatusBar.currentHeight;
const contentHeight = viewportHeight - statusHeight - 56;

export default class LogInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    fontsLoaded: false,
    isLoading: true,
    loginProgress: false,
    nameInputFocusValidation: true,
    passwordInputFocusValidation: true,
    passwordVisible: true,
    modalUserVisible: false,
    modalDateVisible: false,
    usersItemList: [],

    login: "",
    password: "",
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", this.load);
  }

  load = () => {
    this.setState({
      fontsLoaded: false,
      isLoading: true,
      loginProgress: false,
      nameInputFocusValidation: true,
      passwordInputFocusValidation: true,
      login: "",
      password: "",
    });

    if (!this.state.fontsLoaded) {
      Font.loadAsync({
        "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
      }).then(() => this.setState({ fontsLoaded: true }));
    } else {
      this.setState({ fontsLoaded: true });
    }
  };

  handlerFocus = (input) => {
    this.setState({
      [input]: true,
    });
  };

  handlerBlur = (input) => {
    this.setState({
      [input]: false,
    });
  };

  LogIn = (navigate) => {
    console.log(this.state.login.length, this.state.password.length);
    if (this.state.login.length < 2 && this.state.password.length < 2) {
      this.setState({
        passwordInputFocusValidation: false,
        nameInputFocusValidation: false,
      });
    } else {
      if (this.state.password.length > 1) {
        this.setState({ loader: true });
        checkLoginCourier(
          this.props.navigation.state.params.ip,
          this.state.login,
          this.state.password
        )
          .then((res) => {
            if (res.length > 0) {
              const user = res[0];

              getUserAccess(this.props.navigation.state.params.ip, user.USERSID)
                .then((accessResResult) => {
                  const accessRes = accessResResult.result;

                  const isMainCourier = accessRes.some(
                    (permission) =>
                      permission.ACCESSID === "266" && permission.CAN === "1"
                  );

                  const userWithRole = {
                    ...user,
                    IS_MAIN_COURIER: isMainCourier,
                  };

                  storeData("user", userWithRole);
                  this.setState({ loader: false });
                  this.props.navigation.navigate("FreeOrder");
                })
                .catch((error) => {
                  console.error("getUserAccess error:", error);
                  storeData("user", { ...user, IS_MAIN_COURIER: false });
                  this.setState({ loader: false });
                  this.props.navigation.navigate("FreeOrder");
                });
            } else {
              this.setState({ loader: false });
              Alert.alert("Внимание", "Пользователь не найден !");
            }
          })
          .catch((error) => {
            console.error(error);
            this.setState({ loader: false });
          });
      } else {
        this.setState({
          passwordInputFocusValidation: false,
        });
      }
    }
  };

  changePasswordVisible = () => {
    this.setState({
      passwordVisible: !this.state.passwordVisible,
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.fontsLoaded) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Loader show={this.state.loader} />
        <SafeAreaView style={styles.safeArea}>
          <UiHeader headerText="Авторизация" />

          <KeyboardAvoidingView
            style={styles.content}
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            enabled={Platform.OS === "ios"}
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
                    <TextInput
                      style={[
                        styles.textInput,
                        !this.state.nameInputFocusValidation
                          ? styles.inputDanger
                          : "",
                        this.state.nameInputFocus ? styles.textBlured : "",
                      ]}
                      placeholder="Код сотрудника"
                      placeholderTextColor="rgb(138,149,157)"
                      onChangeText={(value) => this.setState({ login: value })}
                      onFocus={() => this.handlerFocus("passwordInputFocus")}
                      onBlur={() => this.handlerBlur("passwordInputFocus")}
                      secureTextEntry={this.state.passwordVisible}
                    />
                    <Text
                      style={[
                        styles.warnText,
                        this.state.nameInputFocusValidation
                          ? styles.hideWarnText
                          : "",
                      ]}
                    >
                      Неверные данные
                    </Text>
                    {/* <UiSelect selectText={this.state.selectedUser} onSelect={() => this.setState({ modalUserVisible: true })} />*/}
                  </View>
                  <View style={styles.input}>
                    <TextInput
                      style={[
                        styles.textInput,
                        !this.state.passwordInputFocusValidation
                          ? styles.inputDanger
                          : "",
                        this.state.passwordInputFocus ? styles.textBlured : "",
                      ]}
                      placeholder="Пароль"
                      placeholderTextColor="rgb(138,149,157)"
                      onChangeText={(value) =>
                        this.setState({ password: value })
                      }
                      onFocus={() => this.handlerFocus("passwordInputFocus")}
                      onBlur={() => this.handlerBlur("passwordInputFocus")}
                      secureTextEntry={this.state.passwordVisible}
                    />
                    <Text
                      style={[
                        styles.warnText,
                        this.state.passwordInputFocusValidation
                          ? styles.hideWarnText
                          : "",
                      ]}
                    >
                      Неверные данные
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.changePasswordVisible()}
                      style={styles.buttonTop}
                    >
                      <Ionicons
                        style={styles.backIcon}
                        name="eye"
                        size={22}
                        color="rgba(138,149,157,0.54)"
                      />
                    </TouchableOpacity>
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
                  linkPress={() => navigate("Ip")}
                  linkText="Нет соединения? "
                  linkLink="Настройки"
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greenColor,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.greenColor,
  },
  content: {
    zIndex: 0,
    flex: 1,
    backgroundColor: Colors.whiteColor,
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
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
  },
  textBlured: {
    borderColor: "#8db63b",
  },
  textUnBlured: {
    borderColor: "#e0e0e0",
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
    color: "rgb(138,149,157)",
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
    backgroundColor: "#fff",
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
    color: "rgb(138, 149, 157)",
    fontSize: 14,
    flexWrap: "wrap",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  borderAfter: {
    borderRightWidth: 1,
    borderRightColor: "rgb(226, 224, 229)",
  },
});
