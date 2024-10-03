import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { isIphoneX } from '../../isIphoneX';
const bottomX = isIphoneX() ? 48 : 16;

import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors.js';
import UiButtonGreen from '../../../components/ui/button/ButtonGreen.js';
import UiModalRadio from '../../../components/ui/modal/ModalRadio.js';

import check from '../../../assets/images/ui/check.png';

import * as Font from 'expo-font';

export default class UiModal extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    fontsLoaded: false,
    isLoading: true,
    loginProgress: false,
    modalRadioVisible: false,
    elementCheck: false,
    addPrice: 10,
  };


  render() {

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {

        }}
        onShow={() => {
          this.setState({
            elementCheck: false,
            addPrice: this.props.maxSumm,
          });
        }}
      >

        <View style={styles.modal}>

          <TouchableOpacity style={styles.modalClose} onPress={this.props.modalUnvisble}></TouchableOpacity>

          <View style={styles.modalInner}>

            <View style={styles.input}>
              <TextInput
                style={styles.summInput}
                placeholder="Сумма доплаты"
                placeholderTextColor={Colors.darkGrayColor}
                keyboardType='numeric'
                value={this.state.addPrice+""}
                onChangeText={(value) =>  {
               
                  if(value <= this.props.maxSumm){
                    this.setState({addPrice: value})
                  }
                  
                }}
              />
            </View>

            <ScrollView style={styles.radio}>
              {/*list*/}

              <TouchableOpacity
                onPress={() => this.setState({ elementCheck: true })}
                style={[styles.option]}
              >
                <Text style={styles.optionText}>Наличными</Text>
                <View style={styles.radioCheck}>
                  {this.state.elementCheck ? <Image source={check} style={styles.checkImage} /> : null}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ elementCheck: false })}
                style={[styles.option]}
              >
                <Text style={styles.optionText}>Картой</Text>
                <View style={styles.radioCheck}>
                  {!this.state.elementCheck ? <Image source={check} style={styles.checkImage} /> : null}
                </View>
              </TouchableOpacity>


            </ScrollView>
            <UiButtonGreen gButtonText="Подтвердить получение оплаты" disabled={false} onPress={() => {
              if(this.state.addPrice > 0 && this.state.addPrice  <= this.props.maxSumm ){
                this.props.callBack(this.state.addPrice, this.state.elementCheck);
                this.setState({ modalRadioVisible: true })
              }
              
            }} />

          </View>

        </View>

      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.68)',
    justifyContent: 'flex-end',
  },
  modalClose: {
    flexGrow: 1,
  },
  modalInner: {
    padding: 16,
    backgroundColor: Colors.lightGrayColor,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    //paddingBottom: bottomX,
  },
  //new
  summInput: {
    backgroundColor: Colors.whiteColor,
    height: 32,
    padding: 8,
    //borderColor: Colors.blackColor,
    //borderWidth: 1,
    borderRadius: 8,
  },
  radio: {
    backgroundColor: Colors.whiteColor,
    padding: 8,
    //borderColor: Colors.blackColor,
    //borderWidth: 1,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
  },
  element: {
    padding: 8,

    marginBottom: 12,
  },
  money: {
    padding: 8,
    borderColor: Colors.blackColor,
    borderWidth: 1,
    borderRadius: 8,
  },
  card: {
    padding: 8,
    borderColor: Colors.blackColor,
    borderWidth: 1,
    borderRadius: 8,
  },
  Text: {
    fontSize: 16,
  },

  option: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  optionActive: {
    backgroundColor: 'rgb(245,245,245)',
  },
  optionText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: 'rgb(16,0,43)',
  },
  radioCheck: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkImage: {
    width: 32,
    height: 32,
  },

})

