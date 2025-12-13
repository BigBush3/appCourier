import React from "react";
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Notifications } from "expo";
import Constants from "expo-constants";

import UiHeader from "../../components/ui/header/Header.js";
import UiProductCard from "../../components/ui/cards/ProductCard";
import UiSelect from "../../components/ui/form/Select.js";
import DateFilterModal from "../../components/ui/modal/DateFilterModal.js";
import Colors from "../../constants/Colors.js";
import Loader from "../../components/ui/Loader.js";

import { setUserPushToken } from "../../services/SignIn.js";
import {
  formatDateSQL,
  formatDateDotsCurr,
} from "../../components/common/Date.js";
import { retrieveData } from "../../services/Storage.js";
import { getAvailablesV2 } from "../../services/Orders.js";

import * as Font from "expo-font";

export default class FreeOrderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    fontsLoaded: false,
    list: [],
    // Фильтр даты
    selectedDate: "-1",
    selectedDateLabel: "Все даты",
    dateModalVisible: false,
  };

  async registerForPushNotificationsAsync(_net) {
    let token = await Notifications.getExpoPushTokenAsync();

    retrieveData("user").then((res) => {
      this.setState({ user: res });
      setUserPushToken(_net.ip, res.USERSID, token)
        .then((res) => {})
        .catch((err) => console.log(err));
    });
  }

  componentDidMount() {
    Font.loadAsync({
      "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));

    //this.load();
    this.props.navigation.addListener("willFocus", this.load);

    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.navigate("FreeOrder");
      return true;
    });
  }

  load = () => {
    retrieveData("network").then((net) => {
      this.setState({ loader: true, net });
      this.registerForPushNotificationsAsync(net);

      this.loadOrders(net.ip, this.state.selectedDate);
    });
  };

  loadOrders = (ip, date) => {
    this.setState({ loader: true });
    getAvailablesV2(ip, date)
      .then((res) => {
        this.setState({ list: res, loader: false });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  onSelectDate = (dateValue, dateLabel) => {
    this.setState({
      selectedDate: dateValue,
      selectedDateLabel: dateLabel,
    });

    if (this.state.net) {
      this.loadOrders(this.state.net.ip, dateValue);
    }
  };

  _checkFree(arr) {
    let ff = false;
    arr.map((item, index) => {
      if (item.STATUSDELIVERYMANID == "-17") {
        ff = true;
      }
    });
    return !ff;
  }

  render() {
    const { navigate } = this.props.navigation;

    var orders = this.state.list.map((item, index) => {
      if (item.STATUSDELIVERYMANID == "-17") {
        return (
          <UiProductCard
            key={index}
            number={item.NUMBER}
            title={item.DESTENATION}
            date={formatDateSQL(item.TOTIME)[0]}
            time={formatDateSQL(item.TOTIME)[1]}
            adress={item.RECEIVERADDRESS}
            statusName={item.STATUSNAME}
            statusColor={item.STATUSCOLOR}
            onPress={() =>
              navigate("Order", {
                backPlace: "FreeOrder",
                pageType: 0,
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
        <UiHeader headerText="Свободные заказы" underline="rgb(255,255,255)" />
        <Loader show={this.state.loader} />

        <DateFilterModal
          visible={this.state.dateModalVisible}
          selectedDate={this.state.selectedDate}
          onClose={() => this.setState({ dateModalVisible: false })}
          onSelectDate={this.onSelectDate}
        />

        <SafeAreaView style={styles.safeArea} forceInset={{ top: "never" }}>
          <View style={styles.content}>
            {/* Фильтр по дате */}
            <View style={styles.filterContainer}>
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Дата:</Text>
                <UiSelect
                  selectText="Выберите дату"
                  optionText={this.state.selectedDateLabel}
                  onSelect={() => this.setState({ dateModalVisible: true })}
                />
              </View>
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
                          Нет доступных заказов
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null}

                {orders}
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
    marginBottom: 0,
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
