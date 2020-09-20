import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { addDeck } from "../actions";
import { saveDeckTitle } from "../utils/api";
import { purple } from "../utils/colors";
import TextButton from "./TextButton";

class AddDeck extends Component {
  state = {
    title: ""
  };

  submitDeck = () => {
    const { dispatch, navigation } = this.props;
    const { title } = this.state;

    saveDeckTitle(title);
    dispatch(addDeck(title));
    navigation.navigate("Deck", { title });

    this.setState(() => ({
      title: ""
    }));
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          onChangeText={title =>
            this.setState(() => ({
              title
            }))
          }
          value={this.state.title}
          placeholder="Deck Title"
          style={styles.input}
        />
        <TextButton
          onPress={this.submitDeck}
          disabled={this.state.title === ""}
        >
          Create Deck
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: purple,
    margin: 15,
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: purple,
    borderRadius: 5,
    margin: 10,
    padding: 10
  }
});

export default connect()(AddDeck);
