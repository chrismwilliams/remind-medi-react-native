import React, { Component } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import { Text as Heading } from "react-native-elements";
import { Constants, Location, Permissions } from "expo";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GOOGLE_API } from "react-native-dotenv";
import PharmacyCard from "../components/PharmacyCard";

export default class LocationScreen extends Component {
  static navigationOptions = {
    title: "Pharmacy Search"
  };
  state = {
    location: null,
    errorMessage: null,
    pharmacy: null
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let { pharmacy } = this.state;
    let latitude,
      longitude = "";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      ({ latitude, longitude } = this.state.location.coords);
    }
    return (
      <View style={styles.container}>
        <Heading h4 style={styles.textHeading}>
          Local Pharmacy Search
        </Heading>
        <Text>{latitude}</Text>
        <Text>{longitude}</Text>
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
