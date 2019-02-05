import React from "react";
import { View, StyleSheet } from "react-native";
import { Badge, Button, Icon, Text } from "react-native-elements";
import format from "date-fns/format";

import Colors from "../constants/Colors";

export default function alertCard(props) {
  const { alert, onPressDelete } = props;
  return (
    <View style={styles.card}>
      <View>
        <Icon
          name="pill"
          type="material-community"
          color={Colors.primaryColor}
        />
        <Text style={styles.cardTitle}>{alert.name}</Text>
      </View>
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
          <Text style={styles.subText}>Frequency</Text>
          <Badge
            value={alert.selectedPeriod}
            containerStyle={styles.badgeContainer}
            textStyle={styles.badgeText}
          />
        </View>
        {alert.selectedPeriod === "Certain Days" && (
          <View style={styles.subContent}>
            <Text style={styles.subText}>Chosen Days</Text>
            <View>
              {alert.selectedDays.map(day => (
                <Badge
                  key={day}
                  value={day}
                  containerStyle={{
                    ...styles.badgeContainer,
                    ...styles.innerBadge
                  }}
                  textStyle={styles.badgeText}
                />
              ))}
            </View>
          </View>
        )}
        <View style={styles.subContent}>
          <View style={styles.alertContainer}>
            <Text style={styles.subText}>Alerts</Text>
            <Badge
              value={alert.numberOfAlerts}
              containerStyle={styles.alertBadge}
              textStyle={styles.alertBadgeText}
            />
          </View>
          <View>
            {alert.timesPicked.map(time => (
              <Badge
                key={time}
                value={format(time, "hh:mm:A")}
                containerStyle={{
                  ...styles.badgeContainer,
                  ...styles.innerBadge
                }}
                textStyle={styles.badgeText}
              />
            ))}
          </View>
        </View>
      </View>
      <Button
        title="DELETE"
        backgroundColor="red"
        containerViewStyle={styles.buttonContainer}
        buttonStyle={styles.deleteButton}
        fontWeight="bold"
        onPress={onPressDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginBottom: 120,
    marginHorizontal: 20,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 15
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryColor
  },
  cardContent: {
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#999"
  },
  subContent: {
    marginTop: 25,
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
    fontWeight: "bold",
    fontSize: 16,
    padding: 7
  },
  innerBadge: {
    marginBottom: 4
  },
  alertContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  alertBadge: {
    marginLeft: 7
  },
  alertBadgeText: {
    padding: 3
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
