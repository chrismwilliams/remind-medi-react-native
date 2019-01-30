import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import Colors from "../constants/Colors";

const formatTime = time => {
  if (!time) return "--:--";
  const timeDate = new Date(time);
  const hours = String(timeDate.getHours()).padStart(2, 0);
  const minutes = String(timeDate.getMinutes()).padStart(2, 0);
  return `${hours}:${minutes}`;
};

export default function timeList({
  numberOfAlerts,
  currentAlertArray,
  openTimePicker
}) {
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
            openTimePicker(i);
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
    minWidth: 100,
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
