import React, { Component } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

export default class LocationScreen extends Component {
  static navigationOptions = {
    title: "Find My Pharmacy"
  };

  render() {
    return (
      <ScrollView>
        <Text>Find your local pharmacy</Text>
      </ScrollView>
    );
  }
}
