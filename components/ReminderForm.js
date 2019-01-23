import React, { PureComponent } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
  Text,
  Badge,
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";

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

export default class ReminderForm extends PureComponent {
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
      showTimes: false,
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

  showTimePicker = () => {
    this.setState({
      dateTimePickerVisible: true
    });
  };

  hideTimePicker = () => {
    this.setState({ dateTimePickerVisible: false });
  };

  handleTimePicked = time => {
    console.log(time);
    this.hideTimePicker();
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
          this.setState({ timesPerDay: item, showTimes: true });
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
      showTimes,
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

        <View style={styles.listWrapper}>
          <Text style={styles.optionText}>
            How often do you require your medication:
          </Text>
          <FlatList
            horizontal={true}
            data={PeriodOptions}
            extraData={selectedPeriod}
            renderItem={this.periodItem}
            keyExtractor={item => item}
          />
        </View>

        {selectedPeriod === "Daily" ? (
          <View style={styles.listWrapper}>
            <Text style={styles.optionText}>Times per Day:</Text>
            <FlatList
              horizontal={true}
              data={DailyOptions}
              extraData={timesPerDay}
              renderItem={this.timesItem}
              keyExtractor={item => item.toString()}
            />
          </View>
        ) : selectedPeriod === "Certain Days" ? (
          <View style={styles.listWrapper}>
            <Text style={styles.optionText}>Select which days:</Text>
            <FlatList
              horizontal={false}
              numColumns={1}
              data={DayOptions}
              extraData={selectedDays}
              renderItem={this.dayItem}
              keyExtractor={item => item}
            />
          </View>
        ) : selectedPeriod === "Other" ? (
          <View style={styles.listWrapper}>
            <Text style={styles.optionText}>Times per month:</Text>
            <FlatList
              horizontal={true}
              data={MonthlyOptions}
              extraData={selectedMonthlyPeriod}
              renderItem={this.monthItem}
              keyExtractor={item => item.toString()}
            />
          </View>
        ) : null}
        {showTimes && (
          <View style={styles.listWrapper}>
            <Text style={styles.optionText}>Set your alarm(s) below:</Text>
            <View style={styles.timeWrapper}>
              <Button
                rounded
                title="Set time"
                icon={{ name: "access-time" }}
                containerViewStyle={styles.timeButton}
                onPress={this.showTimePicker}
              />
              <Text style={styles.chosenTime}>12:00</Text>
            </View>
            <DateTimePicker
              isVisible={dateTimePickerVisible}
              onConfirm={this.handleTimePicked}
              onCancel={this.hideTimePicker}
              mode="time"
              titleIOS="Pick a time"
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 20
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
  },
  timeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  timeButton: {
    marginLeft: 0
  },
  chosenTime: {
    marginRight: 40,
    padding: 10,
    color: Colors.tintColor,
    fontWeight: "bold",
    fontSize: 18,
    borderWidth: 1,
    borderColor: Colors.tintColor
  }
});
