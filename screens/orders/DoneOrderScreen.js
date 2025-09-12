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
import Colors from "../../constants/Colors.js";
import Loader from "../../components/ui/Loader.js";

import * as Font from "expo-font";

import { formatDateSQL } from "../../components/common/Date.js";
import { retrieveData } from "../../services/Storage.js";
import { getDoneOrders } from "../../services/Orders.js";

export default class DoneOrderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    fontsLoaded: false,
    list: [],
    user: { USERID: 0 },
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

  load = () => {
    retrieveData("network").then((net) => {
      this.setState({ loader: true });
      getDoneOrders(net.ip).then((res) => {
        // console.log(res);
        this.setState({ list: res, loader: false });
      });
    });

    retrieveData("user").then((res) => {
      console.log(res);
      this.setState({ user: res });
    });
  };

  render() {
    const { navigate } = this.props.navigation;

    var orders = this.state.list.map((item, index) => {
      if (
        item.STATUSDELIVERYMANID == "-8" &&
        item.DELIVERYMANID == this.state.user.USERSID
      ) {
        return (
          <UiProductCard
            key={index}
            number={item.NUMBER}
            title={item.DESTENATION}
            date={formatDateSQL(item.TOTIME)[0]}
            time={formatDateSQL(item.TOTIME)[1]}
            adress={item.RECEIVERADDRESS}
            onPress={() =>
              navigate("Order", {
                backPlace: "DoneOrder",
                pageType: 3,
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
        <UiHeader
          headerText="Выполненные заказы"
          underline="rgb(255,255,255)"
        />
        <Loader show={this.state.loader} />

        <SafeAreaView style={styles.safeArea} forceInset={{ top: "never" }}>
          <View style={styles.content}>
            <View style={styles.ordersList}>
              <ScrollView
                style={styles.scrollList}
                contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
              >
                {orders.length == 0 ? (
                  <View style={styles.result}>
                    <View style={styles.searchResult}>
                      <View style={styles.noResult}>
                        <Text style={styles.noResultText}>
                          Нет выполненных заказов
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
