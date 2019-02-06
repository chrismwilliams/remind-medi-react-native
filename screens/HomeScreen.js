import React, { Component } from "react";
import { WebBrowser } from "expo";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Button, Icon, Text } from "react-native-elements";

import { deleteAllNotifications } from "../utils/notifications";

import ReminderList from "../components/ReminderList";
import Colors from "../constants/Colors";
import HeaderStyles from "../constants/HeaderStyles";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "My Reminders",
    headerBackTitle: "Back",
    ...HeaderStyles
  };

  deleteEveryThing = async () => {
    await deleteAllNotifications();
    console.log("done!");
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Icon
              name="pill"
              type="material-community"
              color="#fff"
              size={30}
            />
            <Text h1 style={styles.welcomeText}>
              Remind Medi
            </Text>
          </View>

          <ReminderList navigation={this.props.navigation} />

          {__DEV__ && (
            <Button
              title="Delete Notifications"
              icon={{ name: "exclamation-triangle", type: "font-awesome" }}
              buttonStyle={styles.warnButton}
              onPress={this.deleteEveryThing}
            />
          )}

          <View style={styles.linkContainer}>
            <Text style={styles.infoText}>
              This is a demo app created by Chris Williams
            </Text>
            <TouchableOpacity
              style={styles.link}
              onPress={this._handleOpenRepoLink}
            >
              <Icon
                name="github"
                type="font-awesome"
                color={Colors.tintColor}
              />
              <Text style={styles.linkText}>Source Code</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleOpenRepoLink = () => {
    WebBrowser.openBrowserAsync(
      "https://github.com/chrismwilliams/remind-medi-react-native"
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colors.primaryColor
  },
  contentContainer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "space-between"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeText: {
    color: "#fff",
    fontSize: 24
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  linkContainer: {
    alignItems: "center"
  },
  warnButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.errorColor
  },
  infoText: {
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic"
  },
  link: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  linkText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.tintColor,
    textAlign: "center"
  }
});
