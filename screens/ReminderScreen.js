import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { addAlert } from "../redux/actions/alertActions";

import ReminderForm from "../components/ReminderForm";
import StyledTitle from "../components/StyledTitle";
import Colors from "../constants/Colors";
import HeaderStyles from "../constants/HeaderStyles";
import { uniqueID } from "../utils/functions";

class ReminderScreen extends Component {
  static navigationOptions = {
    title: "New Reminder",
    ...HeaderStyles
  };

  onSubmitForm = alertObj => {
    const { navigation } = this.props;

    // add unique id
    const id = uniqueID();
    alertObj.id = id;

    // save
    this.props.addAlert(alertObj);

    // clear form

    // navigate to home screen
    navigation.navigate("Home");
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

const mapDispatchToProps = dispatch => ({
  addAlert: alert => dispatch(addAlert(alert))
});

export default connect(
  null,
  mapDispatchToProps
)(ReminderScreen);
