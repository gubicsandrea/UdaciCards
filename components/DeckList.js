import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import { getDecks } from "../utils/api";
import { getAllDecks } from "../actions";
import { AppLoading } from "expo";

class DeckList extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then(decks => {
        dispatch(getAllDecks(decks));
      })
      .then(() => {
        this.setState(() => ({
          ready: true
        }));
      });
  }
  render() {
    const { decks } = this.props;
    const { ready } = this.state;
    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {Object.keys(decks).map(key => (
            <View key={key}>
              <Text>{key}</Text>
              <Text>{decks[key].questions.length} cards</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
