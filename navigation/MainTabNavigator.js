import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import Colors from "../constants/Colors";
import AlertScreen from "../screens/AlertScreen";
import HomeScreen from "../screens/HomeScreen";
import LocationScreen from "../screens/LocationScreen";
import ReminderScreen from "../screens/ReminderScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Alert: AlertScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home-circle"}
    />
  )
};

const ReminderStack = createStackNavigator({
  Reminder: ReminderScreen
});

ReminderStack.navigationOptions = {
  tabBarLabel: "Add Reminder",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-add-circle" : "md-plus-circle"}
    />
  )
};

const LocationStack = createStackNavigator({
  Location: LocationScreen
});

LocationStack.navigationOptions = {
  tabBarLabel: "Pharmacies",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-navigate" : "md-map-marker-radius"}
    />
  )
};

export default createBottomTabNavigator(
  {
    HomeStack,
    ReminderStack,
    LocationStack
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      style: {
        borderTopColor: Colors.primaryColor
      }
    }
  }
);
