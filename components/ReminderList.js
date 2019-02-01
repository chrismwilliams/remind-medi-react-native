import React from "react";
import { StyleSheet, View } from "react-native";
import { List, ListItem, Text } from "react-native-elements";
import Colors from "../constants/Colors";
import { getAllReminders } from "../utils/reminder";

export default function reminderList(props) {
  const reminders = getAllReminders();
  return (
    <View style={styles.reminderContainer}>
      <Text h2 style={styles.reminderHeader}>
        Reminders
      </Text>
      <List>
        {reminders.map(alert => (
          <ListItem
            key={alert.id}
            title={alert.name}
            subtitle={`Amount: ${alert.numOfTablets}`}
            leftIcon={{
              name: "calendar-clock",
              size: 35,
              type: "material-community",
              style: { ...styles.reminderIcon }
            }}
            onPress={() => props.navigation.navigate("Alert", { id: alert.id })}
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
