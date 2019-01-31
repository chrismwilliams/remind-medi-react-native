import format from "date-fns/format";
import isPast from "date-fns/is_past";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import Colors from "../constants/Colors";

const formatDate = date => {
  if (!date) return "--/--/--";
  const formattedDate = format(date, "DD/MM/YYYY");
  return formattedDate;
};

export default class DateList extends Component {
  state = {
    datePickerVisible: false
  };

  openDatePicker = () => {
    this.setState({ datePickerVisible: true });
  };

  handleDatePicked = date => {
    this.hideDatePicker();

    // if date < today's date, set to current date
    if (isPast(date)) date = new Date();
    this.props.onSubmitDate(date);
  };

  hideDatePicker = () => {
    this.setState({ datePickerVisible: false });
  };

  render() {
    const { currentSelectedDate } = this.props;
    const { datePickerVisible } = this.state;
    return (
      <View style={styles.dateWrapper}>
        <Button
          rounded
          title={"Start Date"}
          icon={{
            name: "calendar-plus",
            type: "material-community",
            size: 28
          }}
          containerViewStyle={styles.timeButton}
          backgroundColor="grey"
          fontWeight="bold"
          onPress={() => {
            this.openDatePicker();
          }}
        />
        <View style={styles.chosenDateWrapper}>
          <Text style={styles.chosenTime}>
            {formatDate(currentSelectedDate)}
          </Text>
        </View>
        <DateTimePicker
          isVisible={datePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDatePicker}
          mode="date"
          titleIOS="Select A Start Date"
          date={currentSelectedDate || new Date()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dateWrapper: {
    flex: 1,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  timeButton: {
    marginLeft: 0
  },
  chosenDateWrapper: {
    minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.tintColor
  },
  chosenTime: {
    color: Colors.tintColor,
    fontWeight: "bold",
    fontSize: 18
  }
});
