import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { List, ListItem, Icon, Text } from "react-native-elements";
import { connect } from "react-redux";

import Colors from "../constants/Colors";

const reminderList = props => {
  const { reminders, navigation } = props;

  return (
    <View style={styles.reminderContainer}>
      {reminders.length ? (
        <View>
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
                onPress={() => navigation.navigate("Alert", { id: alert.id })}
              />
            ))}
          </List>
        </View>
      ) : (
        <View style={styles.containerAlt}>
          <Text style={{ ...styles.reminderHeader, ...styles.headerAlt }}>
            You haven't set any reminders
          </Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("Reminder")}
          >
            <Text style={styles.linkText}>Take me there</Text>
            <Icon
              name="arrow-circle-right"
              type="font-awesome"
              color={Colors.tintColor}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

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
  headerAlt: {
    fontSize: 18
  },
  reminderIcon: {
    color: Colors.tintColor
  },
  containerAlt: {
    alignItems: "center"
  },
  link: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  linkText: {
    marginRight: 7,
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.tintColor,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  reminders: state.alerts
});

export default connect(mapStateToProps)(reminderList);
