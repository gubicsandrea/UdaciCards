import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { addDeck } from "../actions";
import { saveDeckTitle } from "../utils/api";
import { purple, white } from "../utils/colors";

class AddDeck extends Component {
  state = {
    title: ""
  };

  submitDeck = () => {
    const { dispatch } = this.props;
    const { title } = this.state;

    saveDeckTitle(title);
    dispatch(addDeck(title));
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
        <Button
          title="Submit new deck"
          onPress={this.submitDeck}
          disabled={this.state.title === ""}
          color={purple}
          style={{ margin: 10 }}
        />
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
