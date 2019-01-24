import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";

import Colors from "../constants/Colors";

export default class TimeList extends Component {
  state = {};

  render() {
    const { numberOfTimes, openTimePicker } = this.props;
    let timesArr = [];
    for (let i = 0; i < numberOfTimes; i++) {
      timesArr.push(
        <View style={styles.timeWrapper} key={i}>
          <Button
            rounded
            title={`Set time ${i + 1}`}
            icon={{ name: "access-time" }}
            containerViewStyle={styles.timeButton}
            onPress={openTimePicker}
          />
          <Text style={styles.chosenTime}>{`${i + 7}:00 am`}</Text>
        </View>
      );
    }
    return <View>{timesArr}</View>;
  }
}

const styles = StyleSheet.create({
  timeWrapper: {
    marginBottom: 12,
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
