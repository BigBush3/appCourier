import React from 'react';
import { 
  StyleSheet, 
  Modal, 
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  StatusBar,
} from 'react-native';

import { isIphoneX } from '../../isIphoneX';

const statusHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const statusX = isIphoneX() ? 30 : 0;
export const headerTop = statusHeight + statusX;

import arrowBack from '../../../assets/images/ui/arrowBack-2x.png';

export default class UiModalFilterList extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
      }}>
        <View style={styles.modal}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={this.props.modalClose} style={styles.btnLeft}>
              <Image style={styles.btnLeftIcon} source={arrowBack} />
            </TouchableOpacity>
            <Text style={styles.title}>Выберите категорию</Text>
            <TouchableOpacity style={styles.btnRight}>
              <Text style={styles.btnRightText}></Text>
            </TouchableOpacity>
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
    color: 'rgb(2,177,169)',
  },
  

})

 