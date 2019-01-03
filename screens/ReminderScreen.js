import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

export default class ReminderScreen extends React.Component {
  static navigationOptions = {
    title: "Add Reminder"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Add a New Medication</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
