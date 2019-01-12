import React, { PureComponent } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";

export default class PharmacyCard extends PureComponent {
  _openBrowser = link => {
    WebBrowser.openBrowserAsync(link);
  };

  render() {
    const { pharmacy } = this.props;
    return (
      <View style={styles.cardContainer}>
        <Card title={pharmacy.name}>
          <View style={styles.pharmacyDetail}>
            <Ionicons
              name={Platform.OS === "ios" ? "ios-home" : "md-home-circle"}
              size={26}
              style={styles.cardIcon}
            />
            <Text style={styles.detailText}>{pharmacy.formatted_address}</Text>
          </View>
          <View style={styles.pharmacyDetail}>
            <Ionicons name="ios-cellular" size={26} style={styles.cardIcon} />
            <Text style={styles.detailText}>
              {pharmacy.formatted_phone_number}
            </Text>
          </View>
          {pharmacy.website && (
            <View style={styles.pharmacyDetail}>
              <Ionicons name="ios-browsers" size={26} style={styles.cardIcon} />
              <TouchableOpacity
                style={styles.detailText}
                onPress={() => this._openBrowser(pharmacy.website)}
              >
                <Text>{pharmacy.website}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1
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
    marginLeft: 7
  }
});
