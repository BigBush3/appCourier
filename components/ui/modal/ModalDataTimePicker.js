import React from 'react';
import { 
  StyleSheet, 
  Modal, 
  View, 
  Text, 
  Picker,
  TouchableOpacity,
} from 'react-native';
import {formatDateDotsCurr, formatDateDots } from '../../common/Date';

import { isIphoneX } from '../../isIphoneX';
const bottomX = isIphoneX() ? 30 : 0;

export default class UiModalDataTimePicker extends React.Component {

  state = {
    nameValue1: 1,
    nameValue2: 1,
    nameValue3: 1,
    DD: 'Сегодня',
    HH: '09',
    MM: '00',
    monthList: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Декабрь"],
    vH: [],
    vM: [],
    vD: [],
  }


  constructor(props){
    super(props);
  }

  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  getMonthNum(m){
    var ind = 0;
    this.state.monthList.map((item,index) =>{
      
      if(item == m) ind =  index;
    });

    return ind;
  }

  componentDidMount(){
    var hh = [];
    var mm = [];
    var dd = [];
    for(let i = 9; i < 21; i++ ) hh.push(i);
    for(let i = 1; i < 12; i++ ) mm.push(i*5);
    

    let date = new Date();
    let c_day = date.getDate();
    let c_month = date.getMonth();
    let c_year = date.getFullYear();

    dd.push('Сегодня', 'Завтра');
    for(let i = c_day+2; i < this.daysInMonth(c_month, c_year); i++ ) dd.push(i+' '+this.state.monthList[c_month]);
    for(let i = 1; i < this.daysInMonth(c_month+1, c_year); i++ ) dd.push(i+' '+this.state.monthList[c_month+1]);
    this.setState({vH: hh, vM: mm, vD: dd});
  }
  
  render() {

    var hours = this.state.vH.map((item,index)=>{
      if(item < 10) item = '0'+item;
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

    var days = this.state.vD.map((item,index)=>{
      
        return (
          <Picker.Item key={index} label={item.toString()} value={item} />
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
            <Text style={styles.title}>Дата и время</Text>
            <Text style={styles.subtitleText}>{this.props.modalText}</Text>
            <View style={styles.pickerRow}>
              <View style={styles.pickerCol}>
                <Picker
                  selectedValue={this.state.DD}
                  style={styles.picker} 
                  itemStyle={styles.pickerItem}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({DD: itemValue, DDvalue: itemValue})
                  }>

                  {days}

                </Picker>
              </View>
              <View style={styles.pickerCol}>
                <Picker
                  selectedValue={this.state.HH}
                  style={styles.picker} 
                  itemStyle={styles.pickerItem}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({HH: itemValue, HHvalue: itemValue})
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
                    this.setState({MM: itemValue, MMvalue: itemValue})
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
                onPress={ () => { 
                  this.props.modalOkFunction();  
                  var date = formatDateDotsCurr();
                  if(this.state.DD == 'Сегодня'){
                    date = formatDateDotsCurr();
                  } else if(this.state.DD == 'Завтра'){
                    var dd = new Date();
                    dd = dd.setDate(dd.getDate() + 1);
                    date = formatDateDots(dd);
                  } else {  
                    var dd = new Date();  
                    var line = this.state.DD.split(" ");
                    var month = this.getMonthNum(line[1]);
                    month++;
                    if(line[0] < 10) line[0] = '0'+line[0];
                    if(month < 10) month = '0'+month;
                    date = line[0]+"."+ month+'.'+dd.getFullYear();
                  }
                  
                  this.props.modalCallBack({dd: date, tt: this.state.HH+':'+this.state.MM}); 

                }}>
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

 