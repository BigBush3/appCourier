import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import check from '../../../assets/images/ui/check.png';

import { isIphoneX } from '../../isIphoneX';
const bottomX = isIphoneX() ? 34 : 0;

export default class UiModalRadio extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    var list = this.props.modalItems.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => { this.props.selectFunction(); this.props.modalCallBack([item.label, item.value]); }}
          style={[styles.option]}
        >
          <Text style={styles.optionText}>{item.label.toString()}</Text>
          <View style={styles.radioCheck}>
            {this.props.modalChecked == item.value ? <Image source={check} style={styles.checkImage} /> : null}
          </View>
        </TouchableOpacity>
      );
    });


    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          this.props.selectFunction();
        }}
      >
        <View style={styles.modal}>

          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => {
              if (this.props.modalClose) this.props.modalClose(); else this.props.selectFunction();
            }}
          >

          </TouchableOpacity>
          <View style={styles.modalInner}>
            <Text style={styles.subtitleText}>{this.props.subtitle}</Text>
            <ScrollView style={styles.radio}>
              {list}
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.68)',
    justifyContent: 'flex-end',
  },
  modalClose: {
    flexGrow: 1,
    flexShrink: 1,
    width: '100%',
  },
  modalInner: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 3,
    flexGrow: 0,
    flexShrink: 0,
    maxHeight: '70%',
    paddingBottom: bottomX,
  },
  subtitleText: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.13,
    color: 'rgb(138,149,157)',
    fontFamily: 'Roboto-Regular',
    flexGrow: 0,
    flexShrink: 0,
  },
  radio: {
    paddingBottom: 8,
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

});