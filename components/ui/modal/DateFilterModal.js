import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Colors from "../../../constants/Colors.js";

import { isIphoneX } from "../../isIphoneX";
const bottomX = isIphoneX() ? 30 : 0;

export default class DateFilterModal extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isAllDates: true,
    selectedDay: 1,
    selectedMonth: 0,
    selectedYear: new Date().getFullYear(),
    days: [],
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    years: [],
  };

  componentDidMount() {
    this.initializePickers();
  }

  initializePickers = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 1; i <= currentYear + 1; i++) {
      years.push(i);
    }

    const today = new Date();
    this.setState(
      {
        years,
        selectedDay: today.getDate(),
        selectedMonth: today.getMonth(),
        selectedYear: today.getFullYear(),
        isAllDates: this.props.selectedDate === "-1",
      },
      () => {
        this.updateDays();
      }
    );
  };

  daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  updateDays = () => {
    const { selectedMonth, selectedYear, selectedDay } = this.state;
    const daysCount = this.daysInMonth(selectedMonth, selectedYear);
    const days = [];
    for (let i = 1; i <= daysCount; i++) {
      days.push(i);
    }

    // Если выбранный день больше кол-ва дней в месяце
    const newDay = selectedDay > daysCount ? daysCount : selectedDay;

    this.setState({ days, selectedDay: newDay });
  };

  onMonthChange = (month) => {
    this.setState({ selectedMonth: month }, () => {
      this.updateDays();
    });
  };

  onYearChange = (year) => {
    this.setState({ selectedYear: year }, () => {
      this.updateDays();
    });
  };

  formatDate = () => {
    const { selectedDay, selectedMonth, selectedYear } = this.state;
    const day = String(selectedDay).padStart(2, "0");
    const month = String(selectedMonth + 1).padStart(2, "0");
    return `'${day}.${month}.${selectedYear}'`;
  };

  getDateLabel = () => {
    const { selectedDay, selectedMonth, selectedYear, months } = this.state;
    const today = new Date();
    const selected = new Date(selectedYear, selectedMonth, selectedDay);

    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const diff = Math.floor((selected - todayDate) / (1000 * 60 * 60 * 24));

    const day = String(selectedDay).padStart(2, "0");
    const month = String(selectedMonth + 1).padStart(2, "0");
    const dateStr = `${day}.${month}.${selectedYear}`;

    if (diff === 0) {
      return `${dateStr} (Сегодня)`;
    } else if (diff === 1) {
      return `${dateStr} (Завтра)`;
    } else if (diff === -1) {
      return `${dateStr} (Вчера)`;
    }
    return dateStr;
  };

  onConfirm = () => {
    const { isAllDates } = this.state;

    if (isAllDates) {
      this.props.onSelectDate("-1", "Все даты");
    } else {
      const dateValue = this.formatDate();
      const dateLabel = this.getDateLabel();
      this.props.onSelectDate(dateValue, dateLabel);
    }
    this.props.onClose();
  };

  render() {
    const {
      isAllDates,
      selectedDay,
      selectedMonth,
      selectedYear,
      days,
      months,
      years,
    } = this.state;

    const dayItems = days.map((day, index) => (
      <Picker.Item key={index} label={day.toString()} value={day} />
    ));

    const monthItems = months.map((month, index) => (
      <Picker.Item key={index} label={month} value={index} />
    ));

    const yearItems = years.map((year, index) => (
      <Picker.Item key={index} label={year.toString()} value={year} />
    ));

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onShow={() => this.initializePickers()}
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
            <Text style={styles.title}>Выберите дату</Text>

            {/* Переключатель "Все даты" */}
            <View style={styles.allDatesContainer}>
              <TouchableOpacity
                style={[
                  styles.allDatesButton,
                  isAllDates && styles.allDatesButtonActive,
                ]}
                onPress={() => this.setState({ isAllDates: true })}
              >
                <Text
                  style={[
                    styles.allDatesText,
                    isAllDates && styles.allDatesTextActive,
                  ]}
                >
                  Все даты
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.allDatesButton,
                  !isAllDates && styles.allDatesButtonActive,
                ]}
                onPress={() => this.setState({ isAllDates: false })}
              >
                <Text
                  style={[
                    styles.allDatesText,
                    !isAllDates && styles.allDatesTextActive,
                  ]}
                >
                  Выбрать дату
                </Text>
              </TouchableOpacity>
            </View>

            {/* Пикеры даты */}
            {!isAllDates && (
              <View style={styles.pickerRow}>
                <View style={styles.pickerCol}>
                  <Text style={styles.pickerLabel}>День</Text>
                  <Picker
                    selectedValue={selectedDay}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={(value) =>
                      this.setState({ selectedDay: value })
                    }
                  >
                    {dayItems}
                  </Picker>
                </View>
                <View style={styles.pickerColLarge}>
                  <Text style={styles.pickerLabel}>Месяц</Text>
                  <Picker
                    selectedValue={selectedMonth}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={this.onMonthChange}
                  >
                    {monthItems}
                  </Picker>
                </View>
                <View style={styles.pickerCol}>
                  <Text style={styles.pickerLabel}>Год</Text>
                  <Picker
                    selectedValue={selectedYear}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={this.onYearChange}
                  >
                    {yearItems}
                  </Picker>
                </View>
              </View>
            )}

            <View style={styles.modalBar}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => this.props.onClose()}
              >
                <Text style={styles.modalButtonText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={this.onConfirm}
              >
                <Text style={styles.modalButtonTextOk}>Ок</Text>
              </TouchableOpacity>
            </View>
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
    paddingBottom: bottomX,
  },
  title: {
    paddingTop: 22,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    color: "rgb(16,0,43)",
    fontSize: 16,
    lineHeight: 22,
  },
  allDatesContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  allDatesButton: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgb(226,224,229)",
    marginRight: 8,
    borderRadius: 8,
  },
  allDatesButtonActive: {
    backgroundColor: Colors.greenColor,
    borderColor: Colors.greenColor,
  },
  allDatesText: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    color: Colors.darkGrayColor,
  },
  allDatesTextActive: {
    color: "#fff",
  },
  pickerRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  pickerCol: {
    flex: 1,
    alignItems: "center",
  },
  pickerColLarge: {
    flex: 1.5,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 12,
    color: Colors.darkGrayColor,
    fontFamily: "Roboto-Regular",
    marginBottom: 4,
  },
  picker: {
    width: "100%",
  },
  pickerItem: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  modalBar: {
    height: 52,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalButton: {
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    minWidth: 58,
    marginLeft: 8,
  },
  modalButtonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    lineHeight: 20,
    color: "rgb(39,51,76)",
  },
  modalButtonTextOk: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    lineHeight: 20,
    color: Colors.greenColor,
  },
});
