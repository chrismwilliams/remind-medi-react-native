import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Badge,
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";

import OptionList from "./OptionList";
import TimeList from "./TimeList";

import Colors from "../constants/Colors";

const PeriodOptions = ["Daily", "Certain Days", "Other"];
const TimesPerDayOption = 10;
const DailyOptions = [...Array(TimesPerDayOption)].map((val, i) => i + 1);
const DayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const MonthlyOptions = [...Array(4)].map((val, i) => i + 1);

export default class ReminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      name: "",
      frequency: "",
      selectedPeriod: "",
      timesPerDay: "",
      selectedDays: [],
      selectedMonthlyPeriod: "",
      showTimesList: false,
      numberOfAlerts: null,
      timesPicked: [],
      timePickPointer: null,
      dateTimePickerVisible: false
    };
    this.frequencyInputRef = React.createRef();
  }

  isFirstItem = itemIndex => {
    return itemIndex === 1;
  };

  handleInputChange = (stateName, value) => {
    this.setState({
      [stateName]: value
    });
  };

  showTimeSlots = amount => {
    let newTimesArray = [...this.state.timesPicked];
    newTimesArray.splice(amount);
    this.setState({
      numberOfAlerts: amount,
      showTimesList: true,
      timesPicked: newTimesArray
    });
  };

  showTimePicker = index => {
    // TODO: open the picker with the time set previously if set
    this.setState({
      dateTimePickerVisible: true,
      timePickPointer: index
    });
  };

  handleTimePicked = time => {
    const timeDate = new Date(time);
    const hours = timeDate.getHours();
    const minutes = timeDate.getMinutes();

    let timesArray = [...this.state.timesPicked];
    timesArray[this.state.timePickPointer] = `${hours}:${minutes}`;
    this.setState({
      timesPicked: timesArray
    });
    this.hideTimePicker();
  };

  hideTimePicker = () => {
    this.setState({ dateTimePickerVisible: false, timePickPointer: null });
  };

  showInputError = inputName => {
    return this.state.errors.includes(inputName);
  };

  periodItem = ({ item, index }) => {
    return (
      <Badge
        onPress={() => {
          this.setState({ selectedPeriod: item });
        }}
        value={item}
        containerStyle={{
          backgroundColor:
            this.state.selectedPeriod === item ? Colors.tintColor : "grey"
        }}
        wrapperStyle={[
          styles.badgeWrapper,
          { marginLeft: this.isFirstItem(index + 1) ? 0 : 12 }
        ]}
        textStyle={styles.badgeText}
      />
    );
  };

  timesItem = ({ item }) => {
    return (
      <Badge
        onPress={() => {
          this.setState({
            timesPerDay: item
          });
          this.showTimeSlots(item);
        }}
        value={item}
        containerStyle={{
          backgroundColor:
            this.state.timesPerDay === item ? Colors.tintColor : "grey"
        }}
        wrapperStyle={[
          styles.badgeWrapper,
          { marginLeft: this.isFirstItem(item) ? 0 : 12 }
        ]}
        textStyle={styles.badgeText}
      />
    );
  };

  dayItem = ({ item }) => {
    return (
      <Badge
        onPress={() => {
          let updatedDays = [...this.state.selectedDays];
          if (!updatedDays.includes(item)) {
            updatedDays.push(item);
          } else {
            updatedDays.splice(updatedDays.indexOf(item), 1);
          }
          this.setState({
            selectedDays: updatedDays
          });
          this.showTimeSlots(updatedDays.length);
        }}
        value={item}
        containerStyle={{
          backgroundColor: this.state.selectedDays.includes(item)
            ? Colors.tintColor
            : "grey"
        }}
        wrapperStyle={styles.dayBadgeWrapper}
        textStyle={styles.badgeText}
      />
    );
  };

  monthItem = ({ item, index }) => {
    return (
      <Badge
        onPress={() => {
          this.setState({ selectedMonthlyPeriod: item });
          this.showTimeSlots(item);
        }}
        value={item}
        containerStyle={{
          backgroundColor:
            this.state.selectedMonthlyPeriod === item
              ? Colors.tintColor
              : "grey"
        }}
        wrapperStyle={[
          styles.badgeWrapper,
          { marginLeft: this.isFirstItem(index + 1) ? 0 : 12 }
        ]}
        textStyle={styles.badgeText}
      />
    );
  };

  render() {
    let {
      selectedPeriod,
      timesPerDay,
      selectedDays,
      selectedMonthlyPeriod,
      showTimesList,
      numberOfAlerts,
      timesPicked,
      dateTimePickerVisible
    } = this.state;
    return (
      <View style={styles.formContainer}>
        <FormLabel>Medication Name:</FormLabel>
        <FormInput
          onChangeText={text => this.handleInputChange("name", text)}
          inputStyle={styles.inputText}
          returnKeyType="next"
          onSubmitEditing={() => this.frequencyInputRef.current.focus()}
          blurOnSubmit={false}
        />
        <FormValidationMessage>
          {this.showInputError("name") && "This field is required"}
        </FormValidationMessage>
        <FormLabel>Required Amount:</FormLabel>
        <FormInput
          onChangeText={amount => this.handleInputChange("frequency", amount)}
          keyboardType="numeric"
          inputStyle={styles.inputText}
          ref={this.frequencyInputRef}
        />
        <FormValidationMessage>
          {this.showInputError("frequency") &&
            "Please enter the required amount"}
        </FormValidationMessage>

        <OptionList
          text="How often do you require your medication:"
          horizontal={true}
          data={PeriodOptions}
          extraData={selectedPeriod}
          renderItem={this.periodItem}
          extractor={item => item}
        />

        {selectedPeriod === "Daily" ? (
          <OptionList
            text="Times per Day:"
            horizontal={true}
            data={DailyOptions}
            extraData={timesPerDay}
            renderItem={this.timesItem}
            extractor={item => item.toString()}
          />
        ) : selectedPeriod === "Certain Days" ? (
          <OptionList
            text="Select which days:"
            horizontal={false}
            data={DayOptions}
            extraData={selectedDays}
            renderItem={this.dayItem}
            extractor={item => item}
            numColumns={1}
          />
        ) : selectedPeriod === "Other" ? (
          <OptionList
            text="Times per month:"
            horizontal={true}
            data={MonthlyOptions}
            extraData={selectedMonthlyPeriod}
            renderItem={this.monthItem}
            extractor={item => item.toString()}
          />
        ) : null}
        {showTimesList && (
          <View style={styles.listWrapper}>
            <Text style={styles.optionText}>Set your alarm(s) below:</Text>
            <View>
              <TimeList
                numberOfAlerts={numberOfAlerts}
                currentAlertArray={timesPicked}
                openTimePicker={index => this.showTimePicker(index)}
              />
              <DateTimePicker
                isVisible={dateTimePickerVisible}
                onConfirm={this.handleTimePicked}
                onCancel={this.hideTimePicker}
                mode="time"
                titleIOS="Pick a time"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingVertical: 20
  },
  inputText: {
    color: Colors.tintColor,
    fontWeight: "bold"
  },
  listWrapper: {
    marginTop: 25,
    marginLeft: 20
  },
  optionText: {
    color: "#86939e",
    marginBottom: 18,
    fontWeight: "bold",
    fontSize: 15
  },
  badgeWrapper: {
    marginHorizontal: 8
  },
  dayBadgeWrapper: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 8
  },
  badgeText: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 18
  }
});
