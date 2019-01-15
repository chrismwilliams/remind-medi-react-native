import React, { PureComponent } from "react";
import { View, Picker, StyleSheet } from "react-native";
import {
  Text,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

import Colors from "../constants/Colors";

export default class ReminderForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      frequency: "",
      errors: []
    };
    this.frequencyInputRef = React.createRef();
  }

  handleInputChange = (stateName, value) => {
    this.setState({
      [stateName]: value
    });
  };

  showInputError = inputName => {
    return this.state.errors.includes(inputName);
  };

  render() {
    return (
      <View style={styles.formContainer}>
        <FormLabel>Medication Name:</FormLabel>
        <FormInput
          onChangeText={text => this.handleInputChange("name", text)}
          inputStyle={styles.inputText}
          returnKeyType="next"
          onSubmitEditing={() => this.frequencyInputRef.current.focus()}
          blurOnSubmit={false}
        />
        <FormValidationMessage>
          {this.showInputError("name") && "This field is required"}
        </FormValidationMessage>
        <FormLabel>Required Amount:</FormLabel>
        <FormInput
          onChangeText={amount => this.handleInputChange("frequency", amount)}
          keyboardType="numeric"
          inputStyle={styles.inputText}
          ref={this.frequencyInputRef}
        />
        <FormValidationMessage>
          {this.showInputError("frequency") &&
            "Please enter the required amount"}
        </FormValidationMessage>
        <Picker
          selectedValue={this.state.frequency}
          style={{ height: 50 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ frequency: itemValue })
          }
        >
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Specific" value="specific" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 20
  },
  inputText: {
    color: Colors.tintColor,
    fontWeight: "bold"
  }
});
