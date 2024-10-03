import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import bottomContentComponents from "../navigation/BottomContentComponent";

import IpScreen from "../screens/login/IpScreen";
import LogInScreen from "../screens/login/LogInScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import FreeOrderScreen from "../screens/orders/FreeOrderScreen";
import DoneOrderScreen from "../screens/orders/DoneOrderScreen";
import MyOrderScreen from "../screens/orders/MyOrderScreen";
import MapOrderScreen from "../screens/orders/MapOrderScreen";
import OrderScreen from "../screens/orders/OrderScreen";

const HomeStack = createStackNavigator({
  Home: IpScreen,
});
HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarVisible: false,
  tabBarComponent: bottomContentComponents,
};

const IpStack = createStackNavigator({
  Ip: IpScreen,
});
IpStack.navigationOptions = {
  tabBarLabel: "",
  tabBarVisible: false,
  tabBarComponent: bottomContentComponents,
};

const LogInStack = createStackNavigator({
  LogIn: LogInScreen,
});
LogInStack.navigationOptions = {
  tabBarLabel: "",
  tabBarVisible: false,
  tabBarComponent: bottomContentComponents,
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});
SettingsStack.navigationOptions = {
  tabBarLabel: "",
  tabBarVisible: true,
  tabBarComponent: bottomContentComponents,
};

const FreeOrderStack = createStackNavigator({
  FreeOrder: FreeOrderScreen,
});
FreeOrderStack.navigationOptions = {
  tabBarLabel: "FreeOrder",
  tabBarVisible: true,
  tabBarComponent: bottomContentComponents,
};

const DoneOrderStack = createStackNavigator({
  DoneOrder: DoneOrderScreen,
});
DoneOrderStack.navigationOptions = {
  tabBarLabel: "DoneOrder",
  tabBarVisible: true,
  tabBarComponent: bottomContentComponents,
};

const MyOrderStack = createStackNavigator({
  MyOrder: MyOrderScreen,
});
MyOrderStack.navigationOptions = {
  tabBarLabel: "MyOrder",
  tabBarVisible: true,
  tabBarComponent: bottomContentComponents,
};

const MapOrderStack = createStackNavigator({
  MapOrder: MapOrderScreen,
});
MapOrderStack.navigationOptions = {
  tabBarLabel: "MapOrder",
  tabBarVisible: false,
  tabBarComponent: bottomContentComponents,
};

const OrderStack = createStackNavigator({
  Order: OrderScreen,
});
OrderStack.navigationOptions = {
  tabBarLabel: "Order",
  tabBarVisible: false,
  tabBarComponent: bottomContentComponents,
};

export default createBottomTabNavigator({
  HomeStack,
  IpStack,
  LogInStack,
  SettingsStack,
  FreeOrderStack,
  DoneOrderStack,
  MyOrderStack,
  MapOrderStack,
  OrderStack,
});
