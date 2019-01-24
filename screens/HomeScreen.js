import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar
} from "react-native";
import { Text, Icon } from "react-native-elements";
import { WebBrowser } from "expo";

import HeaderStyles from "../constants/HeaderStyles";
import ReminderList from "../components/ReminderList";

import Colors from "../constants/Colors";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "My reminders",
    ...HeaderStyles
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
              size={28}
            />
            <Text h1 style={styles.welcomeText}>
              Remind Medi
            </Text>
          </View>

          <ReminderList />

          <View style={styles.linkContainer}>
            <Text style={styles.infoText}>
              This is a demo app created by Chris Williams
            </Text>
            <TouchableOpacity
              style={styles.link}
              onPress={this._handleOpenRepoLink}
            >
              <Icon name="github" type="font-awesome" color="#fff" size={28} />
              <Text style={styles.linkText}>View Source Code</Text>
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
    paddingVertical: 30,
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
  infoText: {
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    fontStyle: "italic"
  },
  link: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.tintColor,
    padding: 18,
    borderRadius: 5
  },
  linkText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});
