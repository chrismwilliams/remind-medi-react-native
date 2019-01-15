import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Text,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

export default class ReminderScreen extends React.Component {
  static navigationOptions = {
    title: "New Reminder"
  };

  state = {
    name: ""
  };

  updateName = text => {
    this.setState({
      name: text
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text h4 style={styles.headingTxt}>
          Add a New Medication
        </Text>
        <View style={styles.formContainer}>
          <FormLabel>Medication Name:</FormLabel>
          <FormInput onChangeText={this.updateName} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  headingTxt: {
    textAlign: "center"
  },
  formContainer: {
    marginTop: 20
  }
});
