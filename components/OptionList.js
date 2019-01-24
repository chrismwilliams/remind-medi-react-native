import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

export default function optionList({
  text,
  data,
  horizontal,
  extraData,
  renderItem,
  extractor,
  ...options
}) {
  return (
    <View style={styles.listWrapper}>
      <Text style={styles.optionText}>{text}</Text>
      <FlatList
        horizontal={horizontal}
        data={data}
        extraData={extraData}
        renderItem={renderItem}
        keyExtractor={extractor}
        {...options}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    marginTop: 25,
    marginLeft: 20
  },
  optionText: {
    color: "#86939e",
    marginBottom: 18,
    fontWeight: "bold",
    fontSize: 15
  }
});
