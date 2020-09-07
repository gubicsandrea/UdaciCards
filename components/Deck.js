import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

class Deck extends Component {
  render() {
    const { title, deck } = this.props;
    return (
      <View>
        <Text>{title}</Text>
        <Text>{deck.questions.length} cards</Text>
      </View>
    );
  }
}

function mapStateToProps(state, { route }) {
  const { title } = route.params;
  return {
    title,
    deck: state[title]
  };
}

export default connect(mapStateToProps)(Deck);
