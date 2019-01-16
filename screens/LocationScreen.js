import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Card, Button } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Permissions } from "expo";

import { GOOGLE_API } from "react-native-dotenv";
import PharmacyCard from "../components/PharmacyCard";

import Colors from "../constants/Colors";
import HeaderStyles from "../constants/HeaderStyles";
import StyledTitle from "../components/StyledTitle";
export default class LocationScreen extends Component {
  static navigationOptions = {
    title: "Pharmacy Search",
    ...HeaderStyles
  };
  state = {
    pharmacy: null,
    errorMessage: null
  };

  componentWillMount() {
    this._getPermissionAsync();
  }

  _getPermissionAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      this.setState({
        errorMessage: null
      });
    }
  };

  render() {
    let { pharmacy, errorMessage } = this.state;

    return (
      <View style={styles.container}>
        {errorMessage ? (
          <View style={styles.errorWrapper}>
            <Card title="Error">
              <Text style={styles.errorMsg}>
                Unable to retrieve your location.
              </Text>
              <Text style={styles.errorMsg}>
                Please grant permission in your phone's settings if you wish to
                use this feature
              </Text>
              <Button
                onPress={this._getPermissionAsync}
                title="Retry"
                icon={{ name: "cached" }}
                backgroundColor={Colors.errorColor}
                fontWeight="bold"
                style={styles.errorBtn}
                accessibilityLabel="Retry requesting permission of your current location"
              />
            </Card>
          </View>
        ) : (
          <ScrollView>
            <StyledTitle>Find a Pharmacy</StyledTitle>
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
              currentLocationLabel="Current Location"
              debounce={200}
              onPress={(data, details = null) => {
                this.setState({ pharmacy: details });
              }}
              styles={styles.searchInput}
              textInputProps={{
                onFocus: () => {
                  this.state.pharmacy && this.setState({ pharmacy: null });
                }
              }}
            />
            {pharmacy && <PharmacyCard pharmacy={pharmacy} />}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: Colors.primaryColor
  },
  textHeading: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 20
  },
  errorWrapper: {
    flex: 1,
    marginTop: "25%",
    alignItems: "center"
  },
  errorMsg: {
    color: Colors.errorColor,
    marginBottom: 10
  },
  errorBtn: {
    marginTop: 20
  },
  searchInput: {
    width: "100%"
  }
});
