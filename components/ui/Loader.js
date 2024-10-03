import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Animated,
  Easing ,
} from 'react-native'

export default class Loader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: props.show
    }
  }

  rotateValue = new Animated.Value(0); 

 /* AnimatedRotate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.rotateValue, {
        toValue: 1,
        duration: 900,
        easing: Easing.inOut(Easing.quad),
        })
      ]),
      {
        iterations: 1000,
      }
    ).start(() => {
      this.AnimatedRotate();
    })
  }
  */
  componentDidMount(){
    //this.AnimatedRotate();
  }

  render() {
    /*let rotation = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"] // degree of rotation
    });*/
    if(this.props.show){
      return (
        <View style={[styles.loaderBlock, styles.container]} >
          <View style={[styles.loader]}>
            <ActivityIndicator size="large" color="#8db63b" />
           
          </View>
        </View>
      )
    } else {
      //this.AnimatedRotate();
      return (null);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 999,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  loaderBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
  },
  loader: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderImage: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },

});
