import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, List, ListItem } from "react-native-elements";

import { getAllReminders } from "../utils/reminder";
import Colors from "../constants/Colors";

export default function reminderList() {
  const reminders = getAllReminders();
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
              size: 35,
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
