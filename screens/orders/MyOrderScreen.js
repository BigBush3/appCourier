import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  BackHandler,
  Text,
} from "react-native";

import UiHeader from "../../components/ui/header/Header.js";
import UiProductCard from "../../components/ui/cards/ProductCard";
import UiSelect from "../../components/ui/form/Select.js";
import DateFilterModal from "../../components/ui/modal/DateFilterModal.js";
import CourierFilterModal from "../../components/ui/modal/CourierFilterModal.js";
import Colors from "../../constants/Colors.js";
import Loader from "../../components/ui/Loader.js";

import * as Font from "expo-font";
import { formatDateSQL } from "../../components/common/Date.js";
import { retrieveData } from "../../services/Storage.js";
import { getMyOrdersV2 } from "../../services/Orders.js";
import { getAllDeliverymen } from "../../services/User.js";

export default class MyOrderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    fontsLoaded: false,
    list: [],
    user: { USERID: 0 },
    couriers: [],
    net: null,
    // Фильтр даты
    selectedDate: "-1",
    selectedDateLabel: "Все даты",
    dateModalVisible: false,
    // Фильтр курьера
    selectedCourierId: "-1",
    selectedCourierName: "Все курьеры",
    courierModalVisible: false,
  };

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));

    this.props.navigation.addListener("willFocus", this.load);

    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.navigate("FreeOrder");
      return true;
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.net !== this.state.net ||
      prevState.user !== this.state.user
    ) {
      if (
        this.state.user.IS_MAIN_COURIER &&
        this.state.net &&
        this.state.couriers.length === 0
      ) {
        this.loadCouriers();
      }
    }
  }

  load = () => {
    retrieveData("network").then((net) => {
      this.setState({ loader: true, net });

      retrieveData("user").then((user) => {
        this.setState({ user });
        this.loadOrders(
          net.ip,
          this.state.selectedDate,
          this.state.selectedCourierId
        );
      });
    });
  };

  loadOrders = (ip, date, courierId) => {
    this.setState({ loader: true });
    getMyOrdersV2(ip, date, courierId).then((res) => {
      this.setState({ list: res, loader: false });
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

  getCourierName = (deliverymanId) => {
    const courier = this.state.couriers.find(
      (c) => c.USERSID === deliverymanId
    );
    return courier ? courier.NAME : "Неизвестно";
  };

  onSelectDate = (dateValue, dateLabel) => {
    this.setState({
      selectedDate: dateValue,
      selectedDateLabel: dateLabel,
    });

    if (this.state.net) {
      this.loadOrders(
        this.state.net.ip,
        dateValue,
        this.state.selectedCourierId
      );
    }
  };

  onSelectCourier = (courier) => {
    this.setState({
      selectedCourierId: courier.USERSID,
      selectedCourierName: courier.NAME,
    });

    if (this.state.net) {
      this.loadOrders(
        this.state.net.ip,
        this.state.selectedDate,
        courier.USERSID
      );
    }
  };

  _checkFree(arr) {
    let ff = false;
    arr.map((item, index) => {
      if (this.state.user.IS_MAIN_COURIER) {
        if (item.STATUSDELIVERYMANID == "-6") {
          ff = true;
        }
      } else {
        if (
          item.STATUSDELIVERYMANID == "-6" &&
          item.DELIVERYMANID == this.state.user.USERSID
        ) {
          ff = true;
        }
      }
    });
    return !ff;
  }

  render() {
    const { navigate } = this.props.navigation;

    var orders = this.state.list.map((item, index) => {
      let showOrder = false;

      if (this.state.user.IS_MAIN_COURIER) {
        showOrder = item.STATUSDELIVERYMANID == "-6";
      } else {
        showOrder =
          item.STATUSDELIVERYMANID == "-6" &&
          item.DELIVERYMANID == this.state.user.USERSID;
      }

      if (showOrder) {
        const courierName = this.state.user.IS_MAIN_COURIER
          ? this.getCourierName(item.DELIVERYMANID)
          : null;

        console.log("product card", item.STATUSCOLOR);
        return (
          <UiProductCard
            key={index}
            number={item.NUMBER}
            title={item.DESTENATION}
            date={formatDateSQL(item.TOTIME)[0]}
            time={formatDateSQL(item.TOTIME)[1]}
            adress={item.RECEIVERADDRESS}
            courierName={courierName}
            statusName={item.STATUSNAME}
            statusColor={item.STATUSCOLOR}
            onPress={() =>
              navigate("Order", {
                backPlace: "MyOrder",
                pageType: 1,
                order: item,
              })
            }
          />
        );
      }
    });

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <UiHeader headerText="Мои заказы" underline="rgb(255,255,255)" />
        <Loader show={this.state.loader} />

        <DateFilterModal
          visible={this.state.dateModalVisible}
          selectedDate={this.state.selectedDate}
          onClose={() => this.setState({ dateModalVisible: false })}
          onSelectDate={this.onSelectDate}
        />

        <CourierFilterModal
          visible={this.state.courierModalVisible}
          couriers={this.state.couriers}
          selectedCourierId={this.state.selectedCourierId}
          onClose={() => this.setState({ courierModalVisible: false })}
          onSelectCourier={this.onSelectCourier}
        />

        <SafeAreaView style={styles.safeArea} forceInset={{ top: "never" }}>
          <View style={styles.content}>
            {/* Фильтры */}
            <View style={styles.filterContainer}>
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Дата:</Text>
                <UiSelect
                  selectText="Выберите дату"
                  optionText={this.state.selectedDateLabel}
                  onSelect={() => this.setState({ dateModalVisible: true })}
                />
              </View>

              {/* Фильтр курьера - только для главного курьера */}
              {this.state.user.IS_MAIN_COURIER ? (
                <View style={styles.filterItem}>
                  <Text style={styles.filterLabel}>Курьер:</Text>
                  <UiSelect
                    selectText="Выберите курьера"
                    optionText={this.state.selectedCourierName}
                    onSelect={() =>
                      this.setState({ courierModalVisible: true })
                    }
                  />
                </View>
              ) : null}
            </View>

            <View style={styles.ordersList}>
              <ScrollView
                style={styles.scrollList}
                contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
              >
                {this._checkFree(this.state.list) ? (
                  <View style={styles.result}>
                    <View style={styles.searchResult}>
                      <View style={styles.noResult}>
                        <Text style={styles.noResultText}>
                          Нет моих заказов
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  orders
                )}
              </ScrollView>
            </View>
          </View>
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
  /* Filter */
  filterContainer: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(226,224,229)",
  },
  filterItem: {
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.darkGrayColor,
    fontFamily: "Roboto-Regular",
    marginBottom: 4,
  },
  /* List */
  ordersList: {
    flex: 1,
    backgroundColor: Colors.lightColor,
    paddingHorizontal: 16,
  },
  scrollList: {
    width: "100%",
  },
  /* No Search Results */
  resultEmpty: {
    backgroundColor: Colors.whiteColor,
    paddingTop: 64,
    paddingHorizontal: 24,
    height: "100%",
    justifyContent: "flex-start",
  },
  searchResult: {
    marginTop: 64,
  },
  noResult: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 40,
  },
  noResultText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 22,
    color: Colors.darkGrayColor,
    textAlign: "center",
  },
});
