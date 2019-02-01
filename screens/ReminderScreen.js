import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";

import ReminderForm from "../components/ReminderForm";
import StyledTitle from "../components/StyledTitle";
import Colors from "../constants/Colors";
import HeaderStyles from "../constants/HeaderStyles";
import { uniqueID } from "../utils/functions";

export default class ReminderScreen extends Component {
  static navigationOptions = {
    title: "New Reminder",
    ...HeaderStyles
  };

  onSubmitForm = alertObj => {
    console.log(alertObj);

    // period first

    // add unique id
    const id = uniqueID();

    // save

    // clear form

    // navigate to home screen
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <StyledTitle>Add Your Medication</StyledTitle>
        <ReminderForm submitForm={this.onSubmitForm} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: Colors.primaryColor
  }
});
