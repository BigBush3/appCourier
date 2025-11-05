import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  BackHandler,
  Alert,
  Linking,
} from "react-native";
import * as Clipboard from "expo-clipboard";

import UiHeader from "../../components/ui/header/Header.js";
import UiModal from "../../components/ui/modal/Modal.js";
import UiPhotoCard from "../../components/ui/cards/PhotoCard.js";
import UiCourierSelect from "../../components/ui/modal/CourierSelect.js";
import Colors from "../../constants/Colors.js";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import UiButtonGreen from "../../components/ui/button/ButtonGreen.js";
import UiButtonGreenOutline from "../../components/ui/button/ButtonGreenOutline.js";

import { Entypo } from "@expo/vector-icons";

import {
  retrieveData,
  uploadImageAsync,
  addImageItem,
  getAllImages,
  delImageItem,
} from "../../services/Storage.js";
import { formatDateSQL } from "../../components/common/Date.js";
import {
  getCoords,
  doneOrder,
  payOrder,
  addUserToOrder,
  getOrderStatuses,
  setOrderStatus,
} from "../../services/Orders.js";
import { getAllDeliverymen } from "../../services/User.js";
import UiStatusSelect from "../../components/ui/modal/StatusSelect.js";

import * as Font from "expo-font";

export default class OrderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    fontsLoaded: false,
    modalAddVisible: false,
    photoLoaded: false,
    pageType: 1,
    modalCourierSelectVisible: false,
    modalStatusSelectVisible: false,

    summa: 0,
    pred: 0,
    order: 0,
    user: { USERID: 0 },
    coords: [55.755814, 37.617635],
    imagesList: [],
    couriers: [],
    selectedCourierId: null,
    statuses: [],
    selectedStatusId: null,
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
    retrieveData("network").then((net) => {
      this.setState({ net: net });
    });
    this.load();
    this.props.navigation.addListener("willFocus", this.load);

    BackHandler.addEventListener("hardwareBackPress", () => {
      if (
        this.props.navigation.state.params.backPlace != undefined &&
        this.props.navigation.state.params.backPlace != null
      ) {
        if (this.props.navigation.state.params.backPlace == "FreeOrder") {
          this.props.navigation.navigate("FreeOrder");
        } else if (this.props.navigation.state.params.backPlace == "MyOrder") {
          this.props.navigation.navigate("MyOrder");
        } else {
          this.props.navigation.navigate("DoneOrder");
        }
      } else {
        this.props.navigation.navigate("FreeOrder");
      }
      return true;
    });
  }

  load = () => {
    retrieveData("network").then((net) => {
      this.setState({ net: net });

      getAllImages(
        net.ip,
        this.props.navigation.state.params.order.ORDERID
      ).then((res) => {
        console.log("getAllImages", res);
        this.setState({ imagesList: res, mainPhoto: null });
        res.map((item) => {
          if (item.FIRST == 1) this.setState({ mainPhoto: item.NAME });
        });
      });

      getOrderStatuses(net.ip)
        .then((statuses) => {
          this.setState({ statuses });
        })
        .catch((error) => {
          console.error("Ошибка загрузки статусов:", error);
        });
    });

    this.setState({
      pageType: this.props.navigation.state.params.pageType,
      summa: parseFloat(
        this.props.navigation.state.params.order.summ[0]["1"] != ""
          ? this.props.navigation.state.params.order.summ[0]["1"]
          : 0
      ),
      pred:
        this.props.navigation.state.params.order.pred.length > 0
          ? parseFloat(this.props.navigation.state.params.order.pred[0].TOTAL)
          : 0,
      orderid: this.props.navigation.state.params.order.ORDERID,
      checkid: this.props.navigation.state.params.order.CHECKID,
    });
    getCoords(this.props.navigation.state.params.order.RECEIVERADDRESS).then(
      (res) => {
        if (res.response.GeoObjectCollection.featureMember.length > 0) {
          this.setState({
            coords:
              res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
                " "
              ),
          });
          console.log(
            "getCoords",
            res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
              " "
            )
          );
        }
      }
    );

    getCoords(this.props.navigation.state.params.order.MAG).then((res) => {
      if (res.response.GeoObjectCollection.featureMember.length > 0) {
        this.setState({
          coords2:
            res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
              " "
            ),
        });
        console.log(
          "getCoords2",
          res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
            " "
          )
        );
      }
    });

    console.log(
      this.props.navigation.state.params.order,
      this.props.navigation.state.params.order.ORDERID
    );

    retrieveData("user").then((res) => {
      this.setState({ user: res });

      if (res.IS_MAIN_COURIER) {
        this.loadCouriers();
      }
    });
  };

  loadCouriers = () => {
    if (this.state.net) {
      getAllDeliverymen(this.state.net.ip)
        .then((couriers) => {
          this.setState({ couriers });
        })
        .catch((error) => {
          console.error("Ошибка загрузки курьеров:", error);
        });
    }
  };

  _promisedSetState = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        resolve();
      });
    });
  };

  _postPaySumm() {
    let p = 0;
    this.props.navigation.state.params.order.pred.map((item, index) => {
      if (index > 0) {
        p = parseFloat(item.TOTAL) + p;
      }
    });
    return p;
  }

  _pickImage = () => {
    Alert.alert("Выберите источник", "Откуда вы хотите выбрать фото?", [
      {
        text: "Отмена",
        style: "cancel",
      },
      {
        text: "Камера",
        onPress: () => this._pickImageFromCamera(),
      },
      {
        text: "Галерея",
        onPress: () => this._pickImageFromGallery(),
      },
    ]);
  };

  _pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    this._processImageResult(result);
  };

  _pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    this._processImageResult(result);
  };

  _processImageResult = async (result) => {
    if (!result.cancelled) {
      await this._promisedSetState({ loader: true });
      console.log(result);

      uploadImageAsync(this.state.net.ip, result.assets[0].uri)
        .then((res) => {
          console.log("avatart", res);
          this._promisedSetState({ loader: false });
          if (res.image) {
            let _data = {
              id: 0,
              oid: this.props.navigation.state.params.order.ORDERID,
              image: res.image.image_name,
              first: 0,
            };
            addImageItem(this.state.net.ip, _data).then((res) => {
              console.log("addImageItem", res);
              getAllImages(
                this.state.net.ip,
                this.props.navigation.state.params.order.ORDERID
              ).then((res) => {
                console.log("getAllImages", res);
                this.setState({ imagesList: res, mainPhoto: null });
              });
            });
          }
        })
        .catch((res) => {
          console.log("err", res);
          this._promisedSetState({ loader: false });
        });
    }
  };

  _deleteImage = (_id) => {
    delImageItem(this.state.net.ip, _id).then((res) => {
      console.log("addImageItem", res);
      getAllImages(
        this.state.net.ip,
        this.props.navigation.state.params.card.ORDERID
      ).then((res) => {
        console.log("getAllImages", res);
        this.setState({ imagesList: res, mainPhoto: null });
      });
    });
  };

  addUser() {
    if (this.state.user.IS_MAIN_COURIER) {
      this.setState({ modalCourierSelectVisible: true });
    } else {
      this.assignOrderToCourier(this.state.user.USERSID);
    }
  }

  assignOrderToCourier = (courierId) => {
    addUserToOrder(this.state.net.ip, courierId, this.state.orderid)
      .then((res) => {
        console.log(res);
        this.setState({ pageType: 1 });
        Alert.alert("Успех", "Заказ назначен курьеру");
      })
      .catch((error) => {
        console.error("Ошибка назначения заказа:", error);
        Alert.alert("Ошибка", "Не удалось назначить заказ");
      });
  };

  onSelectCourier = (courier) => {
    this.assignOrderToCourier(courier.USERSID);
  };

  changeCourier = () => {
    this.setState({ modalCourierSelectVisible: true });
  };

  changeOrderStatus = () => {
    this.setState({ modalStatusSelectVisible: true });
  };

  onSelectStatus = (status) => {
    setOrderStatus(this.state.net.ip, this.state.orderid, status.STATUSID)
      .then((res) => {
        console.log("Status changed:", res);
        this.setState({ modalStatusSelectVisible: false });
        Alert.alert("Успех", "Статус заказа изменен");
      })
      .catch((error) => {
        console.error("Ошибка изменения статуса:", error);
        Alert.alert("Ошибка", "Не удалось изменить статус заказа");
        this.setState({ modalStatusSelectVisible: false });
      });
  };

  doneOrder() {
    doneOrder(this.state.net.ip, this.state.orderid).then((res) => {
      console.log(res);
      Alert.alert("Внимание", "Вы завершили заказ");
      this.props.navigation.navigate("DoneOrder");
    });
  }

  handlePhonePress = (phoneNumber, label) => {
    if (!phoneNumber || phoneNumber.trim() === "") {
      Alert.alert("Внимание", "Номер телефона не указан");
      return;
    }

    const cleanPhone = phoneNumber.trim();

    Alert.alert(`Телефон ${label}`, cleanPhone, [
      {
        text: "Отмена",
        style: "cancel",
      },
      {
        text: "Скопировать",
        onPress: async () => {
          try {
            await Clipboard.setStringAsync(cleanPhone);
            Alert.alert("Успех", "Номер телефона скопирован в буфер обмена");
          } catch (error) {
            console.error("Ошибка копирования:", error);
            Alert.alert("Ошибка", "Не удалось скопировать номер");
          }
        },
      },
      {
        text: "Позвонить",
        onPress: () => {
          const phoneUrl = `tel:${cleanPhone}`;
          Linking.canOpenURL(phoneUrl)
            .then((supported) => {
              if (supported) {
                return Linking.openURL(phoneUrl);
              } else {
                Alert.alert(
                  "Ошибка",
                  "Функция звонков недоступна на этом устройстве"
                );
              }
            })
            .catch((error) => {
              console.error("Ошибка звонка:", error);
              Alert.alert("Ошибка", "Не удалось совершить звонок");
            });
        },
      },
    ]);
  };

  render() {
    const { navigate } = this.props.navigation;

    var items = this.props.navigation.state.params.order.check.map(
      (item, index) => {
        return (
          <View key={index} style={styles.rowPrice}>
            <Text style={styles.PriceLeftText}>{item.NAME}:</Text>
            <Text style={styles.PriceRightText}>{item.AMOUNT} шт.</Text>
          </View>
        );
      }
    );

    var pred = this.props.navigation.state.params.order.pred.map(
      (item, index) => {
        if (item.TOTAL != "") {
          return (
            <Text key={index} style={styles.PriceRightText}>
              {item.TOTAL} ₽
            </Text>
          );
        }
      }
    );

    var images = this.state.imagesList.map((item, index) => {
      return (
        <UiPhotoCard
          ip={this.state.net.ip}
          img={item.NAME}
          delete={() => this._deleteImage(item.ITEMIMAGEID)}
          key={index}
        />
      );
    });

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <UiHeader
          btnLeft="back"
          pressLeft={() => {
            if (
              this.props.navigation.state.params.backPlace != undefined &&
              this.props.navigation.state.params.backPlace != null
            ) {
              if (this.props.navigation.state.params.backPlace == "FreeOrder") {
                navigate("FreeOrder");
              } else if (
                this.props.navigation.state.params.backPlace == "MyOrder"
              ) {
                navigate("MyOrder");
              } else {
                navigate("DoneOrder");
              }
            } else {
              navigate("FreeOrder");
            }
          }}
          headerText="Информация о заказе"
          underline="rgb(255,255,255)"
        />
        <SafeAreaView style={styles.safeArea} forceInset={{ top: "never" }}>
          <View style={styles.content}>
            {this.state.pageType == 2 ? null : (
              <TouchableOpacity
                style={[styles.map]}
                onPress={() => {
                  navigate("MapOrder", {
                    coords: this.state.coords,
                    coords2: this.state.coords2,
                    adress2: this.props.navigation.state.params.order.MAG,
                    adress:
                      this.props.navigation.state.params.order.RECEIVERADDRESS,
                    title: this.props.navigation.state.params.order.DESTENATION,
                  });
                }}
              >
                <ImageBackground
                  source={require("../../assets/images/googlemapBG.png")}
                  style={styles.mapImage}
                >
                  <Text style={styles.mapText}>
                    <Entypo
                      name="location"
                      size={18}
                      color={Colors.darkGrayColor}
                    />{" "}
                    На карте
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )}

            <View style={styles.ordersList}>
              <ScrollView style={styles.scrollList}>
                <View style={styles.row}>
                  <Text style={styles.leftText}>№ заказа:</Text>
                  <Text style={styles.rightText}>
                    {this.props.navigation.state.params.order.NUMBER}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.leftText}>Дата:</Text>
                  <Text style={styles.rightText}>
                    {
                      formatDateSQL(
                        this.props.navigation.state.params.order.TOTIME
                      )[0]
                    }
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.leftText}>Время:</Text>
                  <Text style={styles.rightText}>
                    {
                      formatDateSQL(
                        this.props.navigation.state.params.order.TOTIME
                      )[1]
                    }{" "}
                    -{" "}
                    {
                      formatDateSQL(
                        this.props.navigation.state.params.order.ENDTIME
                      )[1]
                    }{" "}
                  </Text>
                </View>
                <Text style={styles.headingText}>Заказчик</Text>

                <View style={styles.row}>
                  <Text style={styles.leftText}>Магазин:</Text>
                  <Text style={styles.rightText}>
                    {this.props.navigation.state.params.order.DESTENATION}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.leftText}>ФИО:</Text>
                  <Text style={styles.rightText}>
                    {this.props.navigation.state.params.order.CUSTOMER}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.leftText}>Телефон:</Text>
                  <TouchableOpacity
                    style={styles.phoneContainer}
                    onPress={() =>
                      this.handlePhonePress(
                        this.props.navigation.state.params.order.CUSTOMERPHONE,
                        "заказчика"
                      )
                    }
                  >
                    <Text style={styles.phoneText}>
                      {this.props.navigation.state.params.order.CUSTOMERPHONE}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.headingText}>Получатель</Text>

                <View style={styles.row}>
                  <Text style={styles.leftText}>Адрес:</Text>
                  <Text style={styles.rightText}>
                    {this.props.navigation.state.params.order.RECEIVERADDRESS}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.leftText}>ФИО:</Text>
                  <Text style={styles.rightText}>
                    {this.props.navigation.state.params.order.RECEIVER}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.leftText}>Телефон:</Text>
                  <TouchableOpacity
                    style={styles.phoneContainer}
                    onPress={() =>
                      this.handlePhonePress(
                        this.props.navigation.state.params.order.RECEIVERPHONE,
                        "получателя"
                      )
                    }
                  >
                    <Text style={styles.phoneText}>
                      {this.props.navigation.state.params.order.RECEIVERPHONE}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <Text style={styles.leftText}>Комментарий:</Text>
                  <Text style={styles.rightText}>
                    {this.props.navigation.state.params.order.COMMENT}
                  </Text>
                </View>

                {this.state.pageType == 0 ? null : (
                  <View style={styles.scrollpriceOrder}>
                    <Text style={styles.headingText}>Состав заказа:</Text>
                    {items}
                  </View>
                )}

                {pred.length > 1 ? (
                  <View style={styles.row}>
                    <Text style={styles.PriceLeftText}>Доплачено:</Text>
                    <Text style={styles.PriceRightText}>
                      {this._postPaySumm()} ₽
                    </Text>
                  </View>
                ) : null}

                {this.state.pageType == 1 ? (
                  <View>
                    {pred.length > 0 ? (
                      <View style={styles.row}>
                        <Text style={styles.PriceLeftText}>Предоплата:</Text>
                        {pred[0]}
                      </View>
                    ) : null}

                    <View style={styles.row}>
                      <Text style={styles.PriceLeftText}>Сумма:</Text>
                      <Text style={styles.PriceRightText}>
                        {this.state.summa} ₽
                      </Text>
                    </View>

                    {this.state.user.IS_MAY_PAY ? (
                      <View style={styles.UiButtonGreen}>
                        <UiButtonGreen
                          gButtonText="Оплатить"
                          disabled={false}
                          onPress={() =>
                            this.setState({ modalAddVisible: true })
                          }
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}

                {this.state.pageType == 0 ? null : (
                  <View style={styles.photoContainer}>
                    <ScrollView style={styles.photoScroll} horizontal={true}>
                      {images}
                    </ScrollView>
                  </View>
                )}

                {this.state.pageType == 1 ? (
                  <View>
                    {this.state.user.IS_MAIN_COURIER ? (
                      <View style={styles.UiButtonGreen}>
                        <UiButtonGreenOutline
                          gOButtonText="Сменить курьера"
                          onPress={() => this.changeCourier()}
                        />
                      </View>
                    ) : null}

                    <View style={styles.UiButtonGreen}>
                      <UiButtonGreenOutline
                        gOButtonText="Сменить статус"
                        onPress={() => this.changeOrderStatus()}
                      />
                    </View>

                    <View style={styles.UiButtonGreen}>
                      <UiButtonGreenOutline
                        gOButtonText="Сделать фото"
                        onPress={() => this._pickImage()}
                      />
                    </View>

                    <View style={styles.UiButtonGreen}>
                      <UiButtonGreen
                        gButtonText="Заказ выполнен"
                        disabled={false}
                        onPress={() => {
                          this.doneOrder();
                        }}
                      />
                    </View>
                  </View>
                ) : null}

                {this.state.pageType == 0 ? (
                  <View style={styles.UiButtonGreen}>
                    <UiButtonGreen
                      gButtonText={
                        this.state.user.IS_MAIN_COURIER
                          ? "Назначить курьера"
                          : "Принять в работу"
                      }
                      disabled={false}
                      onPress={() => {
                        this.addUser();
                      }}
                    />
                  </View>
                ) : null}
              </ScrollView>
            </View>
          </View>

          <UiModal
            maxSumm={
              parseInt(this.state.summa) -
              parseInt(this._postPaySumm()) -
              parseInt(
                this.props.navigation.state.params.order.pred.length > 0
                  ? this.props.navigation.state.params.order.pred[0].TOTAL
                  : 0
              )
            }
            modalVisible={this.state.modalAddVisible}
            modalUnvisble={() => this.setState({ modalAddVisible: false })}
            callBack={(price, type) => {
              payOrder(
                this.state.net.ip,
                this.state.checkid,
                type ? 1 : 2,
                this.props.navigation.state.params.order.STATIONID,
                price
              )
                .then((res) => {
                  this.setState({ modalAddVisible: false });
                  Alert.alert("Внимание", "Заказ оплачен");

                  if (
                    this.props.navigation.state.params.backPlace != undefined &&
                    this.props.navigation.state.params.backPlace != null
                  ) {
                    if (
                      this.props.navigation.state.params.backPlace ==
                      "FreeOrder"
                    ) {
                      this.props.navigation.navigate("FreeOrder");
                    } else if (
                      this.props.navigation.state.params.backPlace == "MyOrder"
                    ) {
                      this.props.navigation.navigate("MyOrder");
                    } else {
                      this.props.navigation.navigate("DoneOrder");
                    }
                  } else {
                    this.props.navigation.navigate("FreeOrder");
                  }
                })
                .catch((res) => {
                  console.log(res);
                  Alert.alert("Внимание", "Ошибка формирования чека");
                  this.setState({ modalAddVisible: false });
                });
            }}
          />

          <UiCourierSelect
            visible={this.state.modalCourierSelectVisible}
            couriers={this.state.couriers}
            selectedCourierId={this.state.selectedCourierId}
            onSelectCourier={this.onSelectCourier}
            onClose={() => this.setState({ modalCourierSelectVisible: false })}
          />

          <UiStatusSelect
            visible={this.state.modalStatusSelectVisible}
            statuses={this.state.statuses}
            selectedStatusId={this.state.selectedStatusId}
            onSelectStatus={this.onSelectStatus}
            onClose={() => this.setState({ modalStatusSelectVisible: false })}
          />
        </SafeAreaView>
      </View>
    );
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
    backgroundColor: Colors.whiteColor,
  },

  row: {
    flexDirection: "row",
    marginBottom: 8,
  },

  rowPrice: {
    flexDirection: "row",
    marginBottom: 0,
  },

  map: {},

  mapImage: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  /* List */
  ordersList: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 16,
  },

  scrollList: {
    width: "100%",
    padding: 16,
  },

  scrollpriceOrder: {
    width: "100%",
    marginBottom: 24,
  },

  icon: {
    resizeMode: "contain",
  },

  UiButtonGreen: {
    marginBottom: 20,
  },

  //start text
  leftText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.darkGrayColor,
    flex: 0.4,
  },

  rightText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    flex: 0.6,
  },

  headingText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.blackColor,
    flex: 1,
    marginTop: 20,
    marginBottom: 12,
  },

  PriceLeftText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.darkGrayColor,
    flex: 0.4,
  },

  PriceRightText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    flex: 0.6,
  },

  mapText: {
    fontSize: 18,
    marginLeft: 16,
    color: Colors.darkGrayColor,
  },
  //end text

  photoContainer: {
    flex: 1,
    marginTop: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  phoneContainer: {
    flex: 0.6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
  },

  phoneText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: Colors.greenColor,
    textDecorationLine: "underline",
  },
});
