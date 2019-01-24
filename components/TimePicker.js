import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class TimePicker extends PureComponent {
  state = {
    time: ""
  };
  render() {
    return (
      <View>
        <DateTimePicker mode="time" />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
