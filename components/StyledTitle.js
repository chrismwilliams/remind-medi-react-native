import React, { PureComponent } from "react";
import { Text } from "react-native-elements";
import { StyleSheet } from "react-native";

export default class StyledTitle extends PureComponent {
  render() {
    return <Text h4 {...this.props} style={styles.title} />;
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 20
  }
});
