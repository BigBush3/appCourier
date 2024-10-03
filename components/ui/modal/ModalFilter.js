import React from 'react';
import { 
  StyleSheet, 
  Modal, 
  View,
  ScrollView, 
  Text,
  Image, 
  Switch, 
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Platform,
} from 'react-native';

import { isIphoneX } from '../../isIphoneX';

const statusHeight = Platform.OS === 'ios' ? 20 : 0;
const statusX = isIphoneX() ? 30 : 0;
export const headerTop = statusHeight + statusX;

const bottomX = isIphoneX() ? 30 : 0;

import UiFullButton from '../button/FullButton.js';
import UiButtonGreenOutline from '../button/ButtonGreenOutline.js';

import chevronRight from '../../../assets/images/ui/chevronRight-2x.png';
import closeIcon from '../../../assets/images/ui/close-2x.png';

export default class UiModalFilter extends React.Component {

  constructor(props){
    super(props);
  }

  state = {
    switchFilterValue: false,
    filter1Visible: false,
    filter2Visible: false,
    selectedFilter1: 'Все',
    selectedFilter2: 'Все',
    policlinics: [],
    specialist: [],
  };

  _handleToggleSwitch = () =>{
      this.props.callBackToogle(!this.state.switchFilterValue);

      this.setState(state => ({
        switchFilterValue: !state.switchFilterValue,
      }));
  }

  setFilter1Visible(visible) {
    this.setState({filter1Visible: visible})
  }
  setFilter2Visible(visible) {
    this.setState({filter2Visible: visible})
  }

  render() {
   
    if(this.props.policlinics){
      var policlinics = this.props.policlinics.map((item,index)=>{
        return (
          <TouchableHighlight key={index} underlayColor="rgb(245,245,245)" style={styles.filterListItem} onPress={()=> {
              this.setState({selectedFilter1: item.name }); 
              this.setFilter1Visible(!this.state.filter1Visible);
              this.props.callBackFilter1( item.id );
            }}>
            <Text style={styles.filterListItemText}>{item.name}</Text>
          </TouchableHighlight>
        );
      });
    }
    

    if( this.props.specialist){
      var specialist = this.props.specialist.map((item,index)=>{
        return (
          <TouchableHighlight key={index} underlayColor="rgb(245,245,245)" style={styles.filterListItem} onPress={()=> {
              this.setState({selectedFilter2: item[this.props.specialistName] }); 
              this.setFilter2Visible(!this.state.filter2Visible);
              this.props.callBackFilter2(item[this.props.specialistVal]);
            }}>
            <Text style={styles.filterListItemText}>{item[this.props.specialistName] }</Text>
          </TouchableHighlight>
        );
      });
    }
    

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onShow={()=>{
          if(this.props.policlinicId ){
            this.props.policlinics.map((item,index)=>{
              this.setState({selectedFilter1: item.name }); 
            });
          }
          
        }}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
      }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.modal}>
          
          <View style={styles.header}>
            
            {!this.state.filter1Visible && !this.state.filter2Visible ?
              <TouchableOpacity onPress={this.props.modalClose} style={styles.btnLeft}>
                <Image style={styles.btnLeftIcon} source={closeIcon} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=> {this.setFilter1Visible(false); this.setFilter2Visible(false)}} style={styles.btnLeft}>
                <Image style={styles.btnLeftIcon} source={closeIcon} />
              </TouchableOpacity>
            }
            {!this.state.filter1Visible && !this.state.filter2Visible ?
              <Text style={styles.title}>Фильтр</Text> : 
              null
            }
            {this.state.filter1Visible ?
              <Text style={styles.title}>{this.props.filter1Subtitle}</Text>
              : null
            }
            {this.state.filter2Visible ?
              <Text style={styles.title}>{this.props.filter2Subtitle}</Text>
              : null
            }
          </View>

          {!this.state.filter1Visible && !this.state.filter2Visible ? 
            <View style={styles.filters}>
              <View style={styles.filtersInner}>
                
                <View style={styles.filterItem}>
                  <View style={styles.filterItemText}>
                    <Text style={styles.itemTextTitle}>{this.props.filter3Title}</Text>
                    <Text style={styles.itemTextSubtitle}>{this.props.filter3Subtitle}</Text>
                  </View>
                  {Platform.OS == 'ios' ?
                    <Switch
                      trackColor={{false:'', true:'rgb(141,182,59)'}}
                      value={this.state.switchFilterValue}
                      onValueChange={this._handleToggleSwitch}
                    /> : 
                    <Switch
                      trackColor={{false:'#d4d4d4', true:'#9ee0dd'}}
                      thumbColor={[this.state.switchFilterValue ?'rgb(2,177,169)':'#ffffff']}
                      value={this.state.switchFilterValue}
                      onValueChange={this._handleToggleSwitch}
                    />
                  }
                </View>

                <View style={styles.filterItem}>
                  <View style={styles.filterItemText}>
                    <Text style={styles.itemTextTitle}>{this.props.filter4Title}</Text>
                    <Text style={styles.itemTextSubtitle}>{this.props.filter4Subtitle}</Text>
                  </View>
                  {Platform.OS == 'ios' ?
                    <Switch
                      trackColor={{false:'', true:'rgb(141,182,59)'}}
                      value={!this.state.switchFilterValue}
                      onValueChange={this._handleToggleSwitch}
                    /> : 
                    <Switch
                      trackColor={{false:'#d4d4d4', true:'#9ee0dd'}}
                      thumbColor={[!this.state.switchFilterValue ?'rgb(2,177,169)':'#ffffff']}
                      value={!this.state.switchFilterValue}
                      onValueChange={this._handleToggleSwitch}
                    />
                  }
                </View>
                {this.props.filterDate ?
                  <View style={styles.filterDate}>
                    <UiButtonGreenOutline 
                      gOButtonText="Выбрать даты" 
                      onPress={()=>{
                        this.props.modalClose();
                        this.props.callBackDate(true); 
                      }}
                    />
                  </View>
                  : null
                }
              </View>

              <UiFullButton fullBtnText="Показать" fullBtnPress={this.props.modalPress} />
            </View>
          : null }
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
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 56,
    marginTop: headerTop,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(226,224,229)',
  },
  btnLeft: {
    width: 56,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
  },
  btnLeftIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    color: '#10002b',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Roboto-Medium',
    flexGrow: 1,
    flexShrink: 1,
    textAlign: 'center',
  },
  btnRight: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  btnRightText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgb(141,182,59)',
  },
  filters: {
    flexGrow: 1,
    flexShrink: 1,
    paddingBottom: bottomX,
    backgroundColor: 'rgb(16,0,46)',
  },
  filtersInner: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#fff',
  },
  filterItem: {
    marginLeft: 16,
    paddingRight: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(226,224,229)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterItemText: {
    flexGrow: 1,
    flexShrink: 1,
  },
  itemTextTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgb(16,0,43)',
    marginBottom: 2,
  },
  itemTextSubtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgb(138,149,157)',
  },
  filterItemIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    flexGrow: 0,
    flexShrink: 0,
  },

  filtersList: {
    flexGrow: 1,
    flexShrink: 1,
    paddingBottom: bottomX,
  },
  filterListItem: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexWrap: 'wrap',
  },
  filterListItemText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: 'rgb(16,0,43)',
  },
  filterDate: {
    padding: 16,
  },

})

 