import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GOOGLE_API } from "react-native-dotenv";
import PharmacyCard from "../components/PharmacyCard";

export default class LocationScreen extends Component {
  static navigationOptions = {
    title: "Pharmacy Search"
  };
  state = {
    pharmacy: null
  };

  render() {
    let { pharmacy } = this.state;

    return (
      <View style={styles.container}>
        <Text h4 style={styles.textHeading}>
          Local Pharmacy Search
        </Text>
        <GooglePlacesAutocomplete
          placeholder="Enter a location"
          query={{
            key: GOOGLE_API,
            language: "en"
          }}
          GooglePlacesSearchQuery={{
            rankby: "distance",
            types: "pharmacy"
          }}
          fetchDetails={true}
          currentLocation={true}
          listViewDisplayed="false"
          debounce={200}
          onPress={(data, details = null) => {
            console.log(details);
            this.setState({ pharmacy: details });
          }}
          styles={styles.searchInput}
        />
        {pharmacy && <PharmacyCard pharmacy={pharmacy} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20
  },
  textHeading: {
    textAlign: "center"
  },
  searchInput: {
    width: "100%"
  }
});
