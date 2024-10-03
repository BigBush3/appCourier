import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import UiButtonGreen from '../../components/ui/button/ButtonGreen.js';
import UiHeader from '../../components/ui/header/Header.js';
import UiTextInput from '../../components/ui/form/TextInput.js';
import { isIphoneX } from '../../components/isIphoneX.js';

import * as Font from 'expo-font';
import Colors from '../../constants/Colors.js';
import { retrieveData, storeData } from '../../services/Storage.js';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const statusBarX = isIphoneX() ? 44 : 20;
//const statusBarIndent = Platform.OS === 'ios' ? statusBarX : StatusBar.currentHeight;
const statusBarIndent = Platform.OS === 'ios' ? statusBarX : 0;
const statusHeight = Platform.OS === 'ios' ? statusBarX : StatusBar.currentHeight;
const contentHeight = viewportHeight - statusHeight - 56 - 56;

export default class SettingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    fontsLoaded: false,
    isLoading: true,
    ip: '',
  }

  componentDidMount() {
    if (!this.state.fontsLoaded) {
      Font.loadAsync({
        'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
      }).then(() => this.setState({ fontsLoaded: true }));
    } else {
      this.setState({ fontsLoaded: true });
    }
    
    this.props.navigation.addListener('willFocus', this.load);
  }

  load = () => {
    retrieveData('network').then((net) => {
      if (net) {
        this.setState({ ip: net.ip });
      }  
    });
  }

  saveIp(){
    Alert.alert("Внимание", "Вы сменили ip адрес сервера")
    storeData('network', { ip: this.state.ip });
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <UiHeader
            headerText="Настройки"
          />

          <KeyboardAvoidingView
            style={styles.content}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            enabled={Platform.OS === 'ios'}
          >

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.message}>Изменить IP сервера</Text>
              <View style={styles.form}>
                <UiTextInput backText={this.state.ip} callBack={(res) => this.setState({ip: res}) } />
              </View>
              <View style={styles.form}>
                <UiButtonGreen gButtonText="Сохранить" onPress={() => this.saveIp() } />
              </View>

              <Text style={styles.message}>Выйти из профиля</Text>
              <View style={styles.form}>
                <UiButtonGreen gButtonText="Выход" onPress={() => {
                  storeData("user", null);
                  this.props.navigation.navigate("LogIn");
                }} />
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
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  scrollContent: {
    width: '100%',
    minHeight: contentHeight,
    paddingVertical: 16,
  },

  message: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    color: Colors.darkGrayColor,
    fontFamily: 'Roboto-Regular',
  },

  form: {
    paddingRight: 16,
    marginLeft: 16,
    paddingTop: 8,
  },

});