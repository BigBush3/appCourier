import React from 'react';
import { 
  StyleSheet, 
  Modal, 
  View, 
  Text, 
  Picker,
  TouchableOpacity,
} from 'react-native';

import { isIphoneX } from '../../isIphoneX';
const bottomX = isIphoneX() ? 30 : 0;

export default class UiModalPicker extends React.Component {

  constructor(props){
    super(props);
  }
  state = {
    nameValue: 1,
  }

  render() {
    var list = this.props.modalItems.map( (item, index) => {
        return (
          <Picker.Item  key={index} label={item.label.toString()} value={item.value} />
        );
    });

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
      }}>
        <View style={styles.modal}>
          <TouchableOpacity 
            style={styles.modalClose}
            onPress={()=>{this.props.modalOkFunction();}}
          >
          </TouchableOpacity>

          <View style={styles.modalInner}>
            <Text style={styles.title}>{ this.props.modalTitle }</Text>
            <Text style={styles.subtitleText}>{ this.props.modalText }</Text>
            <Picker
              selectedValue={this.state.nameValue}
              style={styles.picker} 
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({nameValue: itemValue, value: itemValue})
              }>

              {list}

            </Picker>
            <View style={styles.modalBar}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={ this.props.modalCancelFunction }>
                <Text style={styles.modalButtonText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={ () => { this.props.modalOkFunction();  this.props.modalCallBack(this.state.value); }}>
                <Text style={styles.modalButtonText}>Ок</Text>
              </TouchableOpacity>
            </View>
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
  modalClose: {
    flexGrow: 1,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.68)',
    justifyContent: 'flex-end',
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
    paddingBottom: bottomX,
  },
  title: {
    paddingTop: 22,
    paddingHorizontal: 16,
    marginBottom: -7,
    fontFamily: 'Roboto-Medium',
    color: 'rgb(16,0,43)',
    fontSize: 16,
    lineHeight: 22,
  },
  subtitleText: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.13,
    color: 'rgb(138,149,157)',
    fontFamily: 'Roboto-Regular',
  },
  modalBar: {
    height: 52,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalButton: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    minWidth: 58,
    marginLeft: 8,
  },
  modalButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgb(39,51,76)',
  },
  picker: {},
  pickerItem: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
  },

})

 