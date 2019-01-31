import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import StyledTitle from "../components/StyledTitle";
import Colors from "../constants/Colors";
import HeaderStyles from "../constants/HeaderStyles";
import { getReminder } from "../utils/reminder";

export default class ReminderScreen extends Component {
  static navigationOptions = {
    title: "Reminder",
    ...HeaderStyles
  };

  render() {
    const { navigation } = this.props;
    const alertID = navigation.getParam("id", "no id");
    const reminder = getReminder(alertID);
    return (
      <View style={styles.backgroundContainer}>
        {reminder ? (
          <ScrollView style={styles.container}>
            <StyledTitle>Your Medication Alert</StyledTitle>
            <Text>Title: {reminder.title}</Text>
          </ScrollView>
        ) : (
          <View style={styles.container}>
            <Text>Something went wrong 😭</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColor
  },
  container: {
    flex: 1,
    paddingTop: 80
  }
});
