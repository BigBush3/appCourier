import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { NavigationActions } from "react-navigation";

import { Ionicons } from "@expo/vector-icons";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
const phoneWidth = viewportWidth;
const labelSize = phoneWidth < 326 ? 8.5 : 10;

navigateToScreen = (route) => () => {
  const navigateAction = NavigationActions.navigate({
    routeName: route,
  });
  this.setState({ currentRoute: route });
  this.props.navigation.dispatch(navigateAction);
};

const TabBar = (props) => {
  const { navigation } = props;

  const { routes, index: activeRouteIndex } = navigation.state;

  console.log(
    "_index_ ",
    props.navigation.state.routes[props.navigation.state.index].key
  );

  return (
    <SafeAreaView style={S.safeArea} forceInset={{ top: "never" }}>
      <View style={S.container}>
        <TouchableOpacity
          key={1}
          style={[
            S.tabButton,
            props.navigation.state.routes[props.navigation.state.index].key ==
            "FreeOrderStack"
              ? S.tabButtonActive
              : null,
          ]}
          onPress={() => {
            navigation.navigate("FreeOrder");
          }}
          onLongPress={() => {
            navigation.navigate("FreeOrder");
          }}
        >
          {props.navigation.state.routes[props.navigation.state.index].key ==
          "FreeOrderStack" ? (
            <Ionicons
              name="basket"
              size={24}
              style={[S.tabButtonIcon, { opacity: 1 }]}
              color="#8db63b"
            />
          ) : (
            <Ionicons
              name="basket"
              size={24}
              style={[S.tabButtonIcon, { opacity: 0.38 }]}
              color="rgb(16,0,43)"
            />
          )}
          {props.navigation.state.routes[props.navigation.state.index].key ==
          "FreeOrderStack" ? (
            <Text style={[S.tabButtonText, { opacity: 1, color: "#8db63b" }]}>
              Свободные
            </Text>
          ) : (
            <Text style={[S.tabButtonText, { opacity: 0.38 }]}>Свободные</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          key={2}
          style={[
            S.tabButton,
            props.navigation.state.routes[props.navigation.state.index].key ==
            "MyOrderStack"
              ? S.tabButtonActive
              : null,
          ]}
          onPress={() => {
            navigation.navigate("MyOrder");
          }}
          onLongPress={() => {
            navigation.navigate("MyOrder");
          }}
        >
          {props.navigation.state.routes[props.navigation.state.index].key ==
          "MyOrderStack" ? (
            <Ionicons
              name="list"
              size={24}
              style={[S.tabButtonIcon, { opacity: 1 }]}
              color="#8db63b"
            />
          ) : (
            <Ionicons
              name="list"
              size={24}
              style={[S.tabButtonIcon, { opacity: 0.38 }]}
              color="rgb(16,0,43)"
            />
          )}
          {props.navigation.state.routes[props.navigation.state.index].key ==
          "MyOrderStack" ? (
            <Text style={[S.tabButtonText, { opacity: 1, color: "#8db63b" }]}>
              Мои заказы
            </Text>
          ) : (
            <Text style={[S.tabButtonText, { opacity: 0.38 }]}>Мои заказы</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          key={3}
          style={[
            S.tabButton,
            props.navigation.state.routes[props.navigation.state.index].key ==
            "DoneOrderStack"
              ? S.tabButtonActive
              : null,
          ]}
          onPress={() => {
            navigation.navigate("DoneOrder");
          }}
          onLongPress={() => {
            navigation.navigate("DoneOrder");
          }}
        >
          {props.navigation.state.routes[props.navigation.state.index].key ==
          "DoneOrderStack" ? (
            <Ionicons
              name="archive"
              size={24}
              style={[S.tabButtonIcon, { opacity: 1 }]}
              color="#8db63b"
            />
          ) : (
            <Ionicons
              name="archive"
              size={24}
              style={[S.tabButtonIcon, { opacity: 0.38 }]}
              color="rgb(16,0,43)"
            />
          )}
          {props.navigation.state.routes[props.navigation.state.index].key ==
          "DoneOrderStack" ? (
            <Text style={[S.tabButtonText, { opacity: 1, color: "#8db63b" }]}>
              Выполненные
            </Text>
          ) : (
            <Text style={[S.tabButtonText, { opacity: 0.38 }]}>
              Выполненные
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          key={4}
          style={[
            S.tabButton,
            props.navigation.state.routes[props.navigation.state.index].key ==
            "SettingsStack"
              ? S.tabButtonActive
              : null,
          ]}
          onPress={() => {
            navigation.navigate("Settings");
          }}
          onLongPress={() => {
            navigation.navigate("Settings");
          }}
        >
          {props.navigation.state.routes[props.navigation.state.index].key ==
          "SettingsStack" ? (
            <Ionicons
              name="settings"
              size={24}
              style={[S.tabButtonIcon, { opacity: 1 }]}
              color="#8db63b"
            />
          ) : (
            <Ionicons
              name="settings"
              size={24}
              style={[S.tabButtonIcon, { opacity: 0.38 }]}
              color="rgb(16,0,43)"
            />
          )}
          {props.navigation.state.routes[props.navigation.state.index].key ==
          "SettingsStack" ? (
            <Text style={[S.tabButtonText, { opacity: 1, color: "#8db63b" }]}>
              Настройки
            </Text>
          ) : (
            <Text style={[S.tabButtonText, { opacity: 0.38 }]}>Настройки</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TabBar;

const S = StyleSheet.create({
  safeArea: {
    borderTopColor: "#e0e0e0",
  },
  container: {
    flexDirection: "row",
    height: 56,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  tabButtonActive: {
    backgroundColor: "#fff",
    borderTopWidth: 2,
    borderTopColor: "#8db63b",
  },
  tabButtonIcon: {
    height: 28,
    width: 28,
    textAlign: "center",
  },
  tabButtonText: {
    fontSize: labelSize,
    fontWeight: "bold",
    lineHeight: 14,
    color: "rgb(16,0,43)",
  },
});
