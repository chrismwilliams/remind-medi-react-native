import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

import StyledTitle from "../components/StyledTitle";
import AlertCard from "../components/AlertCard";

import Colors from "../constants/Colors";
import HeaderStyles from "../constants/HeaderStyles";
import { getReminder, deleteReminder } from "../utils/reminder";

export default class AlertScreen extends Component {
  static navigationOptions = {
    title: "Reminder",
    ...HeaderStyles
  };

  state = {
    alert: null
  };

  componentDidMount() {
    const { navigation } = this.props;
    const alertID = navigation.getParam("id", "");
    this.setState({ alert: getReminder(alertID) });
  }

  onPressDelete = () => {
    const { navigation } = this.props;

    // delete alert
    deleteReminder(this.state.alert.id);

    // navigate back to home screen
    navigation.navigate("Home");
  };

  render() {
    const { alert } = this.state;
    return (
      <View style={styles.backgroundContainer}>
        {alert ? (
          <ScrollView style={styles.container}>
            <StyledTitle>Your {alert.name} Alert</StyledTitle>
            <AlertCard alert={alert} onPressDelete={this.onPressDelete} />
          </ScrollView>
        ) : (
          <View style={styles.container}>
            <Text h4 style={styles.errorText}>
              Something went wrong 😭
            </Text>
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
  },
  errorText: {
    textAlign: "center",
    color: "#fff"
  }
});
