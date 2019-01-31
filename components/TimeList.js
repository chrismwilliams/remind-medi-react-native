import format from "date-fns/format";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import Colors from "../constants/Colors";

const formatTime = time => {
  if (!time) return "--:--";
  const formattedTime = format(time, "HH:mm:a");
  return formattedTime;
};

export default class TimeList extends Component {
  state = {
    timePickerVisible: false,
    timePickPointer: null
  };

  openTimePicker = index => {
    this.setState({
      timePickerVisible: true,
      timePickPointer: index
    });
  };

  handleTimePicked = time => {
    // call parent with time and pointer
    this.props.onSubmitTime(this.state.timePickPointer, time);

    this.hideTimePicker();
  };

  hideTimePicker = () => {
    this.setState({ timePickerVisible: false, timePickPointer: null });
  };

  currentTimeSelected = () => {
    const { currentAlertArray } = this.props;
    if (!currentAlertArray.length) return new Date();

    const { timePickPointer } = this.state;
    const timeSelected = currentAlertArray[timePickPointer];

    if (!timeSelected) return new Date();
    return new Date(timeSelected);
  };

  renderTimesArray = () => {
    const { numberOfAlerts, currentAlertArray } = this.props;
    let timesArray = [];
    for (let i = 0; i < numberOfAlerts; i++) {
      timesArray.push(
        <View style={styles.timeWrapper} key={i}>
          <Button
            rounded
            title={`Set time ${i + 1}`}
            icon={{ name: "access-time", size: 28 }}
            containerViewStyle={styles.timeButton}
            backgroundColor="grey"
            fontWeight="bold"
            onPress={() => {
              this.openTimePicker(i);
            }}
          />
          <View style={styles.chosenTimeWrapper}>
            <Text style={styles.chosenTime}>
              {formatTime(currentAlertArray[i])}
            </Text>
          </View>
        </View>
      );
    }
    return <View>{timesArray}</View>;
  };

  render() {
    const { timePickerVisible } = this.state;
    return (
      <View>
        {this.renderTimesArray()}
        <DateTimePicker
          isVisible={timePickerVisible}
          onConfirm={this.handleTimePicked}
          onCancel={this.hideTimePicker}
          mode="time"
          titleIOS="Pick a time"
          date={this.currentTimeSelected()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeWrapper: {
    flex: 1,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  timeButton: {
    marginLeft: 0
  },
  chosenTimeWrapper: {
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
