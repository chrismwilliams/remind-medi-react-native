import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ReminderScreen from "../screens/ReminderScreen";
import LocationScreen from "../screens/LocationScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
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
  tabBarLabel: "Location",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-navigate" : "md-map-marker-radius"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  ReminderStack,
  LocationStack
});
