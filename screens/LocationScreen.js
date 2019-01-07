import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl
} from "react-native";
import { Constants, Location, Permissions } from "expo";

export default class LocationScreen extends Component {
  static navigationOptions = {
    title: "Find My Pharmacy"
  };
  state = {
    location: null,
    errorMessage: null,
    refreshing: false
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

  _onRefresh = () => {
    this._getLocationAsync();
  };

  _getLocationAsync = async () => {
    this.setState({ refreshing: true });
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, refreshing: false });
  };

  render() {
    let text = "Loading...";
    let latitude,
      longitude = "";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      ({ latitude, longitude } = this.state.location.coords);
    }
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <Text style={styles.welcome}>Find your local pharmacy</Text>
        <Text>{text}</Text>
        <Text style={styles.coords}>Latitude: {latitude}</Text>
        <Text style={styles.coords}>Longitude: {longitude}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  welcome: {
    fontSize: 20
  },
  coords: {
    color: "#bada55"
  }
});
