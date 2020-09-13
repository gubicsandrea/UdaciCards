import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { addCard } from "../actions";
import { addCardToDeck } from "../utils/api";
import { purple } from "../utils/colors";
import TextButton from "./TextButton";

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  submitCard = () => {
    const { dispatch, goBack, title } = this.props;
    const { question, answer } = this.state;
    const card = {
      question,
      answer
    };

    addCardToDeck(title, card);
    dispatch(addCard(title, card));
    this.setState(() => ({
      question: "",
      answer: ""
    }));
    goBack();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>Question</Text>
        <TextInput
          onChangeText={question =>
            this.setState(() => ({
              question
            }))
          }
          value={this.state.question}
          placeholder="Question"
          style={styles.input}
        />
        <Text style={styles.text}>Answer</Text>
        <TextInput
          onChangeText={answer =>
            this.setState(() => ({
              answer
            }))
          }
          value={this.state.answer}
          placeholder="Answer"
          style={styles.input}
        />
        <TextButton
          onPress={this.submitCard}
          disabled={this.state.question === "" || this.state.answer === ""}
        >
          Add Card
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

function mapStateToProps(state, { route }) {
  const { title } = route.params;
  return {
    title
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    dispatch,
    goBack: () => navigation.goBack()
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
