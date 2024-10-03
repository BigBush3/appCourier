import React from 'react';
import { 
  StyleSheet, 
  Modal, 
  View, 
  Text, 
  Picker,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { formatDateArr } from '../../common/Date';

import { isIphoneX } from '../../isIphoneX';
const bottomX = isIphoneX() ? 30 : 0;

export default class UiModalDataPicker extends React.Component {

  constructor(props){
    super(props);
  }
  state = {
    nameValue: 1,
    y: [],
    m: [],
    d: [],
  }

  sortYear(arr){
    var narr = [];
    arr.map((item, index)=>{
      var date = formatDateArr(item);
      
      var flag = true;
      narr.map((item1, index1)=>{if(item1 == date[3] ) flag = false;});
      if(flag) {
        narr.push(date[3])
      }
    });
    return narr;
  }

  sortMonth(arr, year){
    var narr = [];
    arr.map((item, index)=>{
      var date = formatDateArr(item);
      
      var flag = true;
      narr.map((item1, index1)=>{
        if(item1 == date[1] && date[3].toString() == year.toString() ) flag = false;
      });
      

      if(flag) {
        narr.push(date[1])
      }
      
    });
    console.log(narr);
    return narr;
  } 

  sortDay(arr, month){
    var narr = [];
    arr.map((item, index)=>{
      var date = formatDateArr(item);
      
      if(date[1] == month ) {
        narr.push(date[0])
      }
    });
    return narr;
  }

  selectMonth(val){
    var _m = this.sortMonth(this.props.dates,  val);
    this.setState({m: _m});
    var _d = this.sortDay(this.props.dates, this.state.m[0] );
    this.setState({d: _d});
  }

  slectDays(val){
    var _d = this.sortDay(this.props.dates, val );
    this.setState({d: _d});
  }

  render() {

        var listDate = this.state.d.map((item, index)=>{
          return (<Picker.Item key={index} label={item.toString()} value={item} />);
        });
        var listMonth = this.state.m.map((item, index)=>{
          return (<Picker.Item key={index} label={item.toString()} value={item} />);
        });
        var listYear = this.state.y.map((item, index)=>{
          return (<Picker.Item key={index} label={item.toString()} value={item} />);
        });
  
    

    return (
      <Modal
        animationType="fade"
        transparent={true}
        onShow={()=>{
          var _y = this.sortYear(this.props.dates);
          this.setState({y: _y});
          var _m = this.sortMonth(this.props.dates,  _y[0]);
          this.setState({m: _m});
          var _d = this.sortDay(this.props.dates, _m[0] );
          this.setState({d: _d});
          this.setState({dateValue: _d[0], monthValue: _m[0], yearValue: _y[0] });
          console.log("will show");
        }}
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
            <Text style={styles.title}>Дата</Text>
            <Text style={styles.subtitleText}>{this.props.modalText}</Text>
            <View style={styles.pickerRow}>
              <View style={styles.pickerCol}>
                <Picker
                  selectedValue={this.state.dateValue}
                  style={styles.picker} 
                  itemStyle={styles.pickerItem}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({dateValue: itemValue, value: itemValue})
                  }>
                  
                    {listDate}

                </Picker>
              </View>
              <View style={styles.pickerCol}>
                <Picker
                  selectedValue={this.state.monthValue}
                  style={styles.picker} 
                  itemStyle={styles.pickerItem}
                  onValueChange={(itemValue, itemIndex) =>{
                    this.slectDays(itemValue);
                    this.setState({monthValue: itemValue, value: itemValue})
                  }
                  }>

                  {listMonth}

                </Picker>
              </View>
              <View style={styles.pickerCol}>
                <Picker
                  selectedValue={this.state.yearValue}
                  style={styles.picker} 
                  itemStyle={styles.pickerItem}
                  onValueChange={(itemValue, itemIndex) =>{
                    this.selectMonth(itemValue);
                    this.setState({yearValue: itemValue, value: itemValue})
                  }
                    
                  }>

                  {listYear}

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
                onPress={ () => { this.props.modalOkFunction();  this.props.modalCallBack( {dd:this.state.dateValue, mm: this.state.monthValue, yy: this.state.yearValue  }); }}>
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
  safeArea: {
    backgroundColor: '#fff',
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

 