import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import TextButton from "./TextButton";
import { purple, white } from "../utils/colors";

class Deck extends Component {
  render() {
    const { title, deck } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.cardDetails}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{deck.questions.length} cards</Text>
        </View>
        <View>
          <TextButton
            buttonStyle={{ backgroundColor: white, borderColor: purple }}
            textStyle={{ color: purple }}
          >
            Add Card
          </TextButton>
          <TextButton>Start Quiz</TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardDetails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    color: purple
  },
  text: {
    fontSize: 20,
    color: purple
  }
});

function mapStateToProps(state, { route }) {
  const { title } = route.params;
  return {
    title,
    deck: state[title]
  };
}

export default connect(mapStateToProps)(Deck);
