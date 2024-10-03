import React from 'react';
import { 
  StyleSheet, 
  Modal, 
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class UiAlert extends React.Component {

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
          <View style={styles.modalAlert}>
            {!this.props.alertImage ? null :
              <Image source={this.props.alertImage} style={styles.alertIconImage} />
            }
            {!this.props.alertTitle ? null :
              <Text style={styles.modalAlertTitle}>{this.props.alertTitle}</Text>
            }
            <Text style={styles.modalAlertText}>{this.props.alertText}</Text>
            <View style={styles.modalAlertButtons}>
              <TouchableOpacity 
                style={[styles.button, {paddingHorizontal: 12}]}
                onPress={this.props.cancelPress}
              >
                {this.props.cancelTitle ?  <Text style={styles.buttonText}>{this.props.cancelTitle}</Text> : <Text style={styles.buttonText}>Отмена</Text> }
              </TouchableOpacity>
              {!this.props.okPress ? null :
                <TouchableOpacity 
                  style={[styles.button, {paddingHorizontal: 20}]}
                  onPress={this.props.okPress}
                >
                  <Text style={styles.buttonText}>Да</Text>
                </TouchableOpacity>
              }
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
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalAlert: {
    width: 310,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 8,
    paddingRight: 8,
  },
  alertIconImage: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  modalAlertTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    lineHeight: 24,
    color: 'rgb(16,0,43)',
    marginBottom: 12,
  },
  modalAlertText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgb(138,149,157)',
    marginRight: 16,
    marginBottom: 24,
  },
  modalAlertButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    marginLeft: 8,
  },
  buttonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgb(39,51,76)',
  },

})

 