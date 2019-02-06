import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  Badge,
  Button,
  FormInput,
  FormLabel,
  FormValidationMessage,
  Text
} from "react-native-elements";
import isSameMinute from "date-fns/is_same_minute";

import { sortDays } from "../utils/functions";
import {
  DailyOptions,
  DayOptions,
  MonthlyOptions,
  PeriodOptions
} from "../constants/AlertOptions";
import DateList from "./DateList";
import OptionList from "./OptionList";
import TimeList from "./TimeList";

import Colors from "../constants/Colors";

const initialState = {
  errors: [],
  name: "",
  numOfTablets: "",
  selectedPeriod: "",
  selectedDays: [],
  monthStartDate: null,
  showTimesList: false,
  numberOfAlerts: null,
  timesPicked: []
};

export default class ReminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.frequencyInputRef = React.createRef();
  }

  isFirstItem = itemIndex => {
    return itemIndex === 1;
  };

  handleInputChange = (stateName, value) => {
    // clear error if set
    if (this.state.errors.includes(stateName)) {
      this.setState({
        errors: this.state.errors.filter(err => err !== stateName)
      });
    }

    this.setState({
      [stateName]: value
    });
  };

  clearAllOptions = () => {
    this.setState({
      selectedDays: [],
      showTimesList: false,
      numberOfAlerts: null,
      timesPicked: [],
      monthStartDate: null
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

  showStartDate = () => {
    const { selectedPeriod, numberOfAlerts, timesPicked } = this.state;
    return selectedPeriod === "Other" && numberOfAlerts === timesPicked.length;
  };

  showSaveBtn = () => {
    const {
      selectedPeriod,
      numberOfAlerts,
      timesPicked,
      monthStartDate
    } = this.state;

    // check if monthly option selected and a date set
    if (selectedPeriod === "Other" && !monthStartDate) return false;

    return numberOfAlerts === timesPicked.length;
  };

  saveAlert = () => {
    const alertObj = JSON.parse(JSON.stringify(this.state));

    // check user's options
    if (!alertObj.name || alertObj.name.length < 4) {
      if (!alertObj.errors.includes("name")) {
        alertObj.errors = ["name", ...alertObj.errors];
      }
    }
    if (!alertObj.numOfTablets) {
      if (!alertObj.errors.includes("numOfTablets")) {
        alertObj.errors = ["numOfTablets", ...alertObj.errors];
      }
    }

    if (alertObj.errors.length) {
      this.setState({ errors: [...alertObj.errors] });
      return;
    }

    delete alertObj.errors;
    delete alertObj.showTimesList;

    // clear
    this.setState({
      ...initialState
    });

    this.props.submitForm(alertObj);
  };

  updateTimePicked = (index, time) => {
    let timesArray = [...this.state.timesPicked];
    timesArray[index] = time;

    // filter similar times
    const filteredTimesArray = timesArray
      .sort()
      .filter(
        (val, index, arr) => !index || !isSameMinute(val, arr[index - 1])
      );

    this.setState({
      timesPicked: filteredTimesArray
    });
  };

  updateDatePicked = date => {
    this.setState({ monthStartDate: date });
  };

  showInputError = inputName => {
    return this.state.errors.includes(inputName);
  };

  periodItem = ({ item, index }) => {
    return (
      <Badge
        onPress={() => {
          if (this.state.selectedPeriod && item != this.state.selectedPeriod) {
            this.clearAllOptions();
          }
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
          this.showTimeSlots(item);
        }}
        value={item}
        containerStyle={{
          backgroundColor:
            this.state.numberOfAlerts === item ? Colors.tintColor : "grey"
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

          // sort
          updatedDays = sortDays(updatedDays);

          this.setState({
            selectedDays: updatedDays
          });

          if (updatedDays.length) {
            this.showTimeSlots(1);
          } else {
            this.setState({
              numberOfAlerts: null,
              showTimesList: false
            });
          }
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

  render() {
    let {
      name,
      numOfTablets,
      selectedPeriod,
      selectedDays,
      showTimesList,
      numberOfAlerts,
      timesPicked,
      monthStartDate
    } = this.state;
    return (
      <View style={styles.formContainer}>
        <FormLabel>Medication Name:</FormLabel>
        <FormInput
          onChangeText={text => this.handleInputChange("name", text)}
          value={name}
          inputStyle={styles.inputText}
          returnKeyType="next"
          onSubmitEditing={() => this.frequencyInputRef.current.focus()}
          blurOnSubmit={false}
        />
        <FormValidationMessage>
          {this.showInputError("name") &&
            "This field is required, and include more than 4 characters"}
        </FormValidationMessage>
        <FormLabel>Required Amount:</FormLabel>
        <FormInput
          onChangeText={amount =>
            this.handleInputChange("numOfTablets", amount)
          }
          value={numOfTablets}
          keyboardType="numeric"
          inputStyle={styles.inputText}
          ref={this.frequencyInputRef}
        />
        <FormValidationMessage>
          {this.showInputError("numOfTablets") &&
            "Please enter a required amount"}
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
            extraData={numberOfAlerts}
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
            extraData={numberOfAlerts}
            renderItem={this.timesItem}
            extractor={item => item.toString()}
          />
        ) : null}

        {showTimesList && (
          <View>
            <View style={styles.listWrapper}>
              <Text style={styles.optionText}>Set your alarm(s) below:</Text>
              <TimeList
                numberOfAlerts={numberOfAlerts}
                currentAlertArray={timesPicked}
                onSubmitTime={(index, time) =>
                  this.updateTimePicked(index, time)
                }
              />
            </View>
            {this.showStartDate() && (
              <View style={styles.listWrapper}>
                <Text style={styles.optionText}>
                  Select the initial start date:
                </Text>
                <DateList
                  currentSelectedDate={monthStartDate}
                  onSubmitDate={date => this.updateDatePicked(date)}
                />
              </View>
            )}
            {this.showSaveBtn() && (
              <View style={styles.buttonContainer}>
                <Button
                  title="ADD REMINDER"
                  icon={{ name: "add-alarm", size: 30 }}
                  backgroundColor={Colors.tintColor}
                  fontWeight="bold"
                  buttonStyle={styles.button}
                  loadingRight={true}
                  onPress={() => this.saveAlert()}
                  disabled={this.state.errors.length ? true : false}
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 180
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
  buttonContainer: {
    marginTop: 40,
    alignItems: "center"
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10
  }
});
