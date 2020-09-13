import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { getDecks } from "../utils/api";
import { getAllDecks } from "../actions";
import { AppLoading } from "expo";
import { purple, white, blue } from "../utils/colors";

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
      <View style={{ flex: 1, justifyContent: "center" }}>
        {Object.keys(decks).length !== 0 ? (
          <ScrollView style={{ flex: 1 }}>
            {Object.keys(decks).map(key => (
              <View key={key} style={styles.deckContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Deck", { title: key });
                  }}
                >
                  <Text style={styles.titleText}>{key}</Text>
                  <Text style={styles.text}>
                    {decks[key].questions.length} cards
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noDeck}>You have no decks</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: "center",
    padding: 10,
    backgroundColor: purple,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  titleText: {
    fontSize: 24,
    color: white,
    textAlign: "center"
  },
  text: {
    fontSize: 16,
    color: white,
    textAlign: "center"
  },
  noDeck: {
    textAlign: "center",
    color: blue,
    fontSize: 24
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
