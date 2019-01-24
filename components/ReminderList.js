import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, List, ListItem } from "react-native-elements";

import Colors from "../constants/Colors";

const ExampleList = [
  {
    title: "Tablet 1",
    amount: 2,
    period: "2x Daily"
  },
  {
    title: "Tablet 2",
    amount: 1,
    period: "Monday, Wednesday"
  }
];

export default function reminderList({ reminders = ExampleList }) {
  return (
    <View style={styles.reminderContainer}>
      <Text h2 style={styles.reminderHeader}>
        Reminders
      </Text>
      <List>
        {reminders.map(item => (
          <ListItem
            key={item.title}
            title={item.title}
            subtitle={`Amount: ${item.amount}`}
            leftIcon={{
              name: "calendar-clock",
              type: "material-community",
              style: { ...styles.reminderIcon }
            }}
          />
        ))}
      </List>
    </View>
  );
}

const styles = StyleSheet.create({
  reminderContainer: {
    width: "100%",
    marginBottom: 20
  },
  reminderHeader: {
    paddingHorizontal: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
  reminderIcon: {
    color: Colors.tintColor
  }
});
