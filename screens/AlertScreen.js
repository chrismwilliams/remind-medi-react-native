import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

import { deleteAlert } from "../redux/actions/alertActions";

import AlertCard from "../components/AlertCard";

import Colors from "../constants/Colors";
import HeaderStyles from "../constants/HeaderStyles";

class AlertScreen extends Component {
  static navigationOptions = {
    title: "Reminder",
    ...HeaderStyles
  };

  onPressDelete = () => {
    const { navigation } = this.props;

    // delete alert
    this.props.deleteAlert(this.props.alert.id);

    // navigate back to home screen
    navigation.navigate("Home");
  };

  render() {
    const { alert } = this.props;
    return (
      <View style={styles.backgroundContainer}>
        {alert ? (
          <ScrollView style={styles.container}>
            <AlertCard alert={alert} onPressDelete={this.onPressDelete} />
          </ScrollView>
        ) : (
          <View style={styles.container}>
            <Text h4 style={styles.errorText}>
              Something went wrong 😭
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColor
  },
  container: {
    flex: 1,
    paddingTop: 80
  },
  errorText: {
    textAlign: "center",
    color: "#fff"
  }
});

const mapStateToProps = (state, ownProps) => {
  const { navigation } = ownProps;
  const alertID = navigation.getParam("id", "");

  return {
    alert: state.alerts.find(i => i.id === alertID)
  };
};

const mapDispatchToProps = dispatch => ({
  deleteAlert: id => dispatch(deleteAlert(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertScreen);
