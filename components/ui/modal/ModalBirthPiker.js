import React from 'react';
import { 
  StyleSheet, 
  Modal, 
  View, 
  Text, 
  Picker,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import { formatDateLine, formatDateDotsCurr, formatDateArr, getMonthNumber } from '../../common/Date';
import { isIphoneX } from '../../isIphoneX';
const bottomX = isIphoneX() ? 30 : 0;

export default class UiModalBirthPicker extends React.Component {

  constructor(props){
    super(props);
  }
  state = {
    nameValue: 1,
    y: [],
    m: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    d: [],
    dv: [],
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
    //var _m = this.sortMonth(this.props.dates,  val);
    //this.setState({m: _m});
    //var _d = this.sortDay(this.props.dates, this.state.m[0] );
    //this.setState({d: _d});
  }

  slectDays(val){
    //var _d = this.sortDay(this.props.dates, val );
    //this.setState({d: _d});
    //console.log(val, this.state.yearValue, this.daysInMonth(this.getMonthNumber(val), this.state.yearValue))
    let days = [];
    for(let i=1;i< this.daysInMonth(this.getMonthNumber(val), this.state.yearValue)+1 ;i++) days.push(i);
    this.setState({d: days});
  }

  daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  getMonthNumber(month){
    let m = 0;
    this.state.m.map((item,index)=> {if(item == month) m = index; } )
    return m;
  }

  

  componentDidMount(){
    var year = [];
    let c_year = parseInt(new Date().getFullYear());
    for(let i=c_year;i>1900;i--) year.push(i);

    console.log(this.props.default)


    let dd = formatDateDotsCurr();
    if(this.props.default != undefined )  dd = this.props.default;
    dd = dd.split(".");

    let days = [];
    for(let i=1;i< this.daysInMonth( parseInt(dd[1]) , parseInt(dd[2])) ;i++) days.push(i);
 
  
    this.setState({d:days, y: year, dateValue: parseInt(dd[0]), monthValue: this.state.m[parseInt(dd[1])-1], yearValue: parseInt(dd[2])  });

 
    }
 
  

  render() {

        var listDate = this.state.d.map((item, index)=>{
          /*if(this.state.monthValue == "Февраль" ){
            if( (this.state.yearValue % 4 == 0) && (this.state.yearValue % 100 != 0) || (this.state.yearValue % 400 == 0) ){
              if(item < 30){
                return (<Picker.Item key={index} label={item.toString()} value={item} />);
              } 
            } else {
              if(item < 29){
                return (<Picker.Item key={index} label={item.toString()} value={item} />);
              } 
            }
            return (<Picker.Item key={index} label={item.toString()} value={item} />);
          } else {
            return (<Picker.Item key={index} label={item.toString()} value={item} />);
          }
          */
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
        backButtonClose={true}
        onBackButtonPress={ () => { } }
        onBackdropPress={ () => { } }
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
                      //this.slectMonth(itemValue);
                      this.slectDays(this.state.monthValue);
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
                  onPress={ () => { 
                      this.props.modalOkFunction(); 
                      let month = getMonthNumber(this.state.monthValue);
                      let day = this.state.dateValue;
                      var date = new Date();
                      date.setDate(day);
                      date.setMonth(month);
                      date.setFullYear(this.state.yearValue);
                      this.props.modalCallBack(  formatDateLine(date)  ); 
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
  safeArea: {
    flex: 1,
    backgroundColor: 'red',
  },
  modalClose: {
    flexGrow: 1,
    flexShrink: 1,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.68)',
    justifyContent: 'space-between',
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

 