import React from 'react';
import { 
  StyleSheet, 
  Modal, 
  View, 
  Text, 
  Picker,
  TouchableOpacity,
} from 'react-native';
import { formatDateArr, formatDateTimeArr } from '../../common/Date';

import { isIphoneX } from '../../isIphoneX';
const bottomX = isIphoneX() ? 30 : 0;

export default class UiModalTimePicker extends React.Component {

  constructor(props){
    super(props);
  }
  state = {
    nameValue: 1,
    HH: 0,
    MM: '00',
    vH: [],
    vM: [],
  }

  isInArray(value, array) {
      return array.indexOf(value) > -1;
  }

  sortHours(arr){
    var narr = [];
    arr.map((item, index)=>{
      var date = formatDateTimeArr(item);
      
      var flag = true;
      narr.map((item1, index1)=>{if(item1 == date[4] ) flag = false;});
      if(flag) {
        narr.push(date[4])
      }
    });
    return narr;
  }

  sortMin(arr, hh){
    var narr = [];
    arr.map((item, index)=>{
      var date = formatDateTimeArr(item);
      //console.log(date);
      if(date[4] == hh ) {
        narr.push(date[5])
      }
    });
    //console.log(hh, narr, arr, );
    return narr;
  }


  render() {

    var hours = this.state.vH.map((item,index)=>{
      return (
          <Picker.Item key={index} label={item.toString()} value={item} />
        );
    });

    var minutes = this.state.vM.map((item,index)=>{
      if(item < 10) item = '0'+item;
        return (
          <Picker.Item key={index} label={item.toString()} value={item} />
        );
    });

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onShow={()=>{
          var _vH = [];
          var _vM = [];
          if(this.props.modalItems){
            this.props.modalItems.map((item,index)=>{
              var dd = new Date(item);
              var hh = dd.getHours();
              if(!this.isInArray(hh,_vH)) _vH.push(hh);
            });
            this.props.modalItems.map((item,index)=>{
              var dd = new Date(item);
              var mm = dd.getMinutes();
              if(!this.isInArray(mm,_vM)) _vM.push(mm);
            });
          } else {
            for(let i=1;i<25;i++) _vH.push(i);
            for(let i=1;i<59;i++) _vM.push(i);
          }
         
         
          
          

          this.setState({vH: _vH, vM: _vM});
          if(this.props.modalItems){
            var dd = new Date( this.props.modalItems[0] );
            var mm = dd.getMinutes();
            var hh = dd.getHours();
            if(mm < 10) mm = '0'+mm;
            this.setState({
              HH: hh, MM: mm, vM: this.sortMin(this.props.modalItems, hh )
            });
          }


          
        }}
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
            <Text style={styles.title}>Время</Text>
            <Text style={styles.subtitleText}>{this.props.modalText}</Text>
            <View style={styles.pickerRow}>
              <View style={styles.pickerCol}>
                <Picker
                  selectedValue={this.state.HH}
                  style={styles.picker} 
                  itemStyle={styles.pickerItem}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({HH: itemValue, value: itemValue })
                  }>

                  {hours}

                </Picker>
              </View>
              <View style={styles.pickerCol}>
                <Picker
                  selectedValue={this.state.MM}
                  style={styles.picker} 
                  itemStyle={styles.pickerItem}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({MM: itemValue, value: itemValue})
                  }>

                  {minutes}

                </Picker>
              </View>
            </View>
            <View style={styles.modalBar}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={ this.props.modalCancelFunction }>
                <Text style={styles.modalButtonText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={ () => { this.props.modalOkFunction();  this.props.modalCallBack({hh: this.state.HH, mm: this.state.MM }); }}>
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
  pickerRow: {
    flexDirection: 'row',
  },
  pickerCol: {
    flex: 1,
  },

})

 