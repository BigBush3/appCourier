import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from "react-native";

import * as Font from "expo-font";

import UiHeader from "../../components/ui/header/Header.js";
import Colors from "../../constants/Colors.js";
import myLocateImage from "../../assets/images/location/placeActive.png";

import {
  Fontisto,
  FontAwesome,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

import MapView, {
  AnimatedRegion,
  Animated,
  Marker,
  Callout,
} from "react-native-maps";

import * as Location from "expo-location";

export default class MapOrderScreen extends React.Component {
  state = {
    fontsLoaded: false,
    searchResult: [],
    markers: [],
    latitude: 0,
    longitude: 0,

    region: new AnimatedRegion({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    }),
    showHelper: false,
    helperTitle: "",
    helperDates: "",
    helperPhone: "",
  };

  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.map = null;
  }

  async componentDidMount() {
    const permission = await Location.getForegroundPermissionsAsync();
    console.log("permission", permission);
    if (permission.status !== "granted") {
    }
    console.log("st", permission.status);
    this.load();

    this.props.navigation.addListener("willFocus", this.load);
  }

  _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);

    this.map.fitToCoordinates(
      [
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      ],
      {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      }
    );

    this.setState({
      location,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  load = () => {
    this.setState({
      markers: [
        {
          latitude: parseFloat(this.props.navigation.state.params.coords[1]),
          longitude: parseFloat(this.props.navigation.state.params.coords[0]),
          filialName: this.props.navigation.state.params.title,
          adress: this.props.navigation.state.params.adress,
        },
        {
          latitude: parseFloat(this.props.navigation.state.params.coords2[1]),
          longitude: parseFloat(this.props.navigation.state.params.coords2[0]),
          filialName: "Магазин",
          adress: this.props.navigation.state.params.adress2,
        },
      ],
    });
    setTimeout(() => {
      if (this.map) {
        console.log(this.props.navigation.state.params.coords);
        this.map.fitToCoordinates(
          [
            {
              latitude: parseFloat(
                this.props.navigation.state.params.coords[1]
              ),
              longitude: parseFloat(
                this.props.navigation.state.params.coords[0]
              ),
            },
          ],
          {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
          }
        );
      }
    }, 2000);
  };

  formatPhone(str) {
    var result = str.split("").slice(0, 12);
    result.splice(1, 0, " (");
    result.splice(5, 0, ") ");
    result.splice(9, 0, " - ");
    result.splice(12, 0, " - ");
    return result.join("");
  }

  _Helper(data) {
    setTimeout(() => {
      this.map.fitToCoordinates(
        [{ latitude: data.latitude, longitude: data.longitude }],
        {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        }
      );
    }, 2000);

    this.setState({
      showHelper: true,

      helperTitle: data.address,
      helperDates: data.operatingTime,
      helperPhone: this.formatPhone(data.phone),
    });
  }

  myLocation() {
    console.log("clc");
    this._getLocationAsync();
  }

  onMapReady = () => {
    this.setState({ isMapReady: true });
    //this._getLocationAsync();

    console.log("map is ready!!");
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <UiHeader
          btnLeft="back"
          pressLeft={() => navigate("Order", { reload: false })}
          headerText="Карта"
          underline="rgb(255,255,255)"
        />

        <SafeAreaView style={styles.safeArea} forceInset={{ top: "never" }}>
          <View style={styles.content}>
            <View style={styles.mapContainer}>
              <View style={styles.map}>
                <MapView
                  ref={(ref) => {
                    this.map = ref;
                  }}
                  style={{ flex: 1, zIndex: 0 }}
                  showsUserLocation={true}
                  moveOnMarkerPress={true}
                >
                  <Marker
                    pinColor="#fff"
                    coordinate={{
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                    }}
                  >
                    <View style={styles.myLocate}>
                      <Image
                        source={myLocateImage}
                        style={styles.myLocateImage}
                      />
                    </View>
                    <Callout
                      tooltip
                      fillColor="#fff"
                      style={styles.customView}
                    ></Callout>
                  </Marker>

                  {this.state.markers.map((marker, index) => {
                    let coor = {
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    };
                    return (
                      <Marker
                        key={index}
                        coordinate={coor}
                        title={marker.filialName}
                        description={marker.address}
                        pinColor={index == 0 ? "red" : "navy"}
                      >
                        <Callout tooltip style={styles.customView}></Callout>
                      </Marker>
                    );
                  })}
                </MapView>

                <TouchableOpacity
                  style={[styles.mapYouHere]}
                  onPress={this.props.onPress}
                  onPress={() => {
                    navigate("MapOrder");
                  }}
                >
                  <View style={styles.youHere}>
                    <MaterialIcons
                      name="my-location"
                      size={24}
                      style={[styles.iconYouHere]}
                      color={Colors.darkGrayColor}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.info}>
              <View style={styles.row}>
                <View style={styles.leftInnerRow}>
                  <Fontisto
                    name="shopping-store"
                    size={16}
                    style={[styles.icon]}
                    color={Colors.darkGrayColor}
                  />
                  <Text style={styles.leftText}>Магазин:</Text>
                </View>

                <View style={styles.rightInnerRow}>
                  <Text style={styles.rightText}>
                    {this.props.navigation.state.params.title}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.leftInnerRow}>
                  <Entypo
                    name="location"
                    size={16}
                    style={[styles.icon]}
                    color={Colors.darkGrayColor}
                  />
                  <Text style={styles.leftText}>Доставить: </Text>
                </View>

                <View style={styles.rightInnerRow}>
                  <Text style={styles.rightText}>
                    {this.props.navigation.state.params.adress}
                  </Text>
                </View>
              </View>
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
    backgroundColor: Colors.lightGrayColor,
  },

  mapContainer: {
    backgroundColor: "blue",
    flex: 1,
  },

  map: {
    flex: 1,
    backgroundColor: Colors.lightGrayColor,
    flexDirection: "column-reverse",
  },
  mapYouHere: {
    position: "absolute",
    top: 15,
    right: 15,
  },

  youHere: {
    zIndex: 1,
    height: 50,
    width: 50,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    borderRadius: 25,
    marginBottom: 8,
    marginRight: 8,
  },

  leftText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: Colors.darkGrayColor,
    flex: 1,
  },

  rightText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },

  icon: {
    marginRight: 8,
  },

  info: {
    backgroundColor: Colors.whiteColor,
    padding: 12,
    paddingTop: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  leftInnerRow: {
    //backgroundColor: 'blue',
    flexDirection: "row",
    flex: 0.4,
    alignItems: "center",
    marginRight: 8,
  },

  rightInnerRow: {
    //backgroundColor: 'red',
    flexDirection: "row",
    flex: 0.6,
    alignItems: "center",
  },
});
