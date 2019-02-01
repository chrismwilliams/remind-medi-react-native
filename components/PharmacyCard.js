import React, { PureComponent } from "react";
import {
  Platform,
  Text,
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList
} from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default class PharmacyCard extends PureComponent {
  _openBrowser = link => {
    WebBrowser.openBrowserAsync(link);
  };

  _openTel = num => {
    Linking.openURL(`tel://${num}`);
  };

  render() {
    const { pharmacy } = this.props;
    return (
      <Animated.View style={styles.cardContainer}>
        <Card title={pharmacy.name}>
          <View style={styles.pharmacyDetail}>
            <Ionicons
              name={Platform.OS === "ios" ? "ios-home" : "md-home-circle"}
              size={26}
              style={styles.cardIcon}
            />
            <Text style={styles.detailText}>{pharmacy.vicinity}</Text>
          </View>
          {pharmacy.opening_hours && (
            <View style={styles.pharmacyDetail}>
              <Icon name="access-time" color="#666" />
              <View style={styles.timesWrapper}>
                <Text
                  style={{
                    ...styles.pharmacyStatus,
                    ...(pharmacy.opening_hours.open_now
                      ? styles.pharmacyOpen
                      : styles.pharmacyClosed)
                  }}
                >
                  Current status:{" "}
                  {pharmacy.opening_hours.open_now ? "Open" : "Closed"}
                </Text>
                <FlatList
                  data={pharmacy.opening_hours.weekday_text}
                  renderItem={({ item }) => (
                    <Text style={styles.pharmacyTimes}>{item}</Text>
                  )}
                  keyExtractor={item => item}
                />
              </View>
            </View>
          )}
          {pharmacy.formatted_phone_number && (
            <View style={styles.pharmacyDetail}>
              <Icon name="phone" type="Foundation" color="#666" />
              <TouchableOpacity
                onPress={() => this._openTel(pharmacy.formatted_phone_number)}
              >
                <View style={styles.telWrapper}>
                  <Text style={styles.pharmacyTel}>
                    {pharmacy.formatted_phone_number}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {pharmacy.website && (
            <Button
              buttonStyle={styles.websiteBtn}
              backgroundColor={Colors.tintColor}
              fontWeight="bold"
              title="Visit Website"
              onPress={() => this._openBrowser(pharmacy.website)}
            />
          )}
        </Card>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 3,
    paddingBottom: 80
  },
  pharmacyDetail: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  cardIcon: {
    color: "#666"
  },
  detailText: {
    paddingHorizontal: 10,
    fontSize: 16
  },
  timesWrapper: {
    paddingHorizontal: 10
  },
  pharmacyStatus: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 7
  },
  pharmacyTimes: {
    fontSize: 16
  },
  pharmacyOpen: {
    color: Colors.openColor
  },
  pharmacyClosed: {
    color: Colors.errorColor
  },
  telWrapper: {
    marginHorizontal: 10,
    paddingBottom: 5,
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 1
  },
  pharmacyTel: {
    fontSize: 16,
    color: Colors.tintColor
  },
  websiteBtn: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10
  }
});
