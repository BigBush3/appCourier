import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import check from "../../../assets/images/ui/check.png";

import { isIphoneX } from "../../isIphoneX";
import {
  convertColorToHex,
  getTextColorForBackground,
} from "../../../utils/index.js";

const bottomX = isIphoneX() ? 34 : 0;

export default class UiStatusSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var list = this.props.statuses.map((status, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            this.props.onClose();
            this.props.onSelectStatus(status);
          }}
          style={[styles.option]}
        >
          <View style={styles.statusInfo}>
            <View style={styles.statusNameContainer}>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: convertColorToHex(status.COLOR),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    {
                      color: getTextColorForBackground(
                        convertColorToHex(status.COLOR)
                      ),
                    },
                  ]}
                >
                  {status.NAME}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.radioCheck}>
            {this.props.selectedStatusId === status.STATUSID ? (
              <Image source={check} style={styles.checkImage} />
            ) : null}
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          this.props.onClose();
        }}
      >
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => {
              this.props.onClose();
            }}
          ></TouchableOpacity>
          <View style={styles.modalInner}>
            <Text style={styles.subtitleText}>
              Выберите новый статус заказа
            </Text>
            <ScrollView style={styles.radio}>{list}</ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.68)",
    justifyContent: "flex-end",
  },
  modalClose: {
    flexGrow: 1,
    flexShrink: 1,
    width: "100%",
  },
  modalInner: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 3,
    flexGrow: 0,
    flexShrink: 0,
    maxHeight: Dimensions.get("window").height * 0.7,
    paddingBottom: bottomX,
  },
  subtitleText: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.13,
    color: "rgb(138,149,157)",
    fontFamily: "Roboto-Regular",
    flexGrow: 0,
    flexShrink: 0,
  },
  radio: {
    paddingBottom: 8,
  },
  option: {
    minHeight: 60,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
  },
  statusInfo: {
    flex: 1,
    paddingRight: 12,
  },
  statusNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Roboto-Medium",
  },
  radioCheck: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  checkImage: {
    width: 32,
    height: 32,
  },
});
