import React from "react";
import { View, StyleSheet } from "react-native";
import { Badge, Button, Text } from "react-native-elements";

export default function alertCard() {
  const { alert } = this.props;
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{alert.name}</Text>
      <View style={styles.cardContent}>
        <View style={styles.subContent}>
          <Text style={styles.subText}>Required Amount</Text>
          <Badge
            value={alert.numOfTablets}
            containerStyle={styles.badgeContainer}
            textStyle={styles.badgeText}
          />
        </View>
        <View style={styles.subContent}>
          <Text style={styles.subText}>Alert Frequency</Text>
          <Badge
            value={alert.selectedPeriod}
            containerStyle={styles.badgeContainer}
            textStyle={styles.badgeText}
          />
        </View>
      </View>
      <Button
        title="DELETE"
        backgroundColor="red"
        containerViewStyle={styles.buttonContainer}
        buttonStyle={styles.deleteButton}
        fontWeight="bold"
        onPress={this.props.onPressDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginHorizontal: 30,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 15
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  cardContent: {
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#999"
  },
  subContent: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  subText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#888"
  },
  badgeContainer: {
    backgroundColor: Colors.tintColor
  },
  badgeText: {
    fontWeight: "bold"
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    marginLeft: 0,
    marginRight: 0
  },
  deleteButton: {
    padding: 20,
    borderRadius: 10
  }
});
