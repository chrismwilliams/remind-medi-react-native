import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

import Colors from "../constants/Colors";
import ReminderForm from "../components/ReminderForm";

export default class ReminderScreen extends React.Component {
  static navigationOptions = {
    title: "New Reminder"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text h4 style={styles.headingTxt}>
          Add a New Medication
        </Text>
        <ReminderForm />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.primaryColor
  },
  headingTxt: {
    textAlign: "center",
    color: "#fff"
  }
});
