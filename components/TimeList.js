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
            icon={{ name: "access-time", size: 28 }}
            containerViewStyle={styles.timeButton}
            backgroundColor="grey"
            fontWeight="bold"
            onPress={openTimePicker}
          />
          <View style={styles.chosenTimeWrapper}>
            <Text style={styles.chosenTime}>--:--</Text>
          </View>
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
    justifyContent: "space-between"
  },
  timeButton: {
    marginLeft: 0
  },
  chosenTimeWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 40,
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
