import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import StyledTitle from "../components/StyledTitle";
import HeaderStyles from "../constants/HeaderStyles";
import ReminderForm from "../components/ReminderForm";

export default class ReminderScreen extends React.Component {
  static navigationOptions = {
    title: "New Reminder",
    ...HeaderStyles
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <StyledTitle>Add Your Medication</StyledTitle>
        <ReminderForm />
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
