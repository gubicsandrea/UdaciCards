import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import TextButton from "./TextButton";
import Result from "./Result";
import { red, green, white, blue } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {
  state = {
    index: 0,
    showAnswer: false,
    buttonText: "Answer",
    points: 0,
    finished: false
  };

  toggleShowAnswer = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer,
      buttonText: prevState.showAnswer ? "Answer" : "Question"
    }));
  };

  handleCorrect = () => {
    this.setState(prevState => ({
      points: prevState.points + 1
    }));
    this.nextQuestion();
  };

  handleIncorrect = () => {
    this.nextQuestion();
  };

  nextQuestion = () => {
    const { questions } = this.props;
    const { index } = this.state;
    if (index < questions.length - 1) {
      this.setState(prevState => ({
        index: prevState.index + 1,
        showAnswer: false,
        buttonText: "Answer"
      }));
    } else {
      this.setState(() => ({
        finished: true
      }));
    }
  };

  restart = () => {
    this.setState({
      index: 0,
      showAnswer: false,
      buttonText: "Answer",
      points: 0,
      finished: false
    });
  };

  conponentDidMount() {
    clearLocalNotification().then(() => {
      let date = new Date();
      date.setDate(date.getDate + 1);
      setLocalNotification(date);
    });
  }

  render() {
    const { title, questions, navigation } = this.props;
    const { index, showAnswer, buttonText, points, finished } = this.state;

    if (finished) {
      return (
        <View style={styles.container}>
          <View style={styles.question}>
            <Result
              title={title}
              points={points}
              maxPoints={questions.length}
            />
          </View>
          <View>
            <TextButton onPress={this.restart}>Restart Quiz</TextButton>
            <TextButton onPress={() => navigation.navigate("Deck", { title })}>
              Back to Deck
            </TextButton>
          </View>
        </View>
      );
    }

    const text = showAnswer
      ? questions[index].answer
      : questions[index].question;
    return (
      <View style={styles.container}>
        <View style={styles.question}>
          <Text style={styles.paging}>
            {index + 1}/{questions.length}
          </Text>
          <Text style={styles.text}>{text}</Text>
          <TextButton
            onPress={this.toggleShowAnswer}
            buttonStyle={{ backgroundColor: white }}
            textStyle={{ color: red }}
          >
            {buttonText}
          </TextButton>
        </View>
        <View>
          <TextButton
            onPress={this.handleCorrect}
            buttonStyle={{ backgroundColor: green }}
          >
            Correct
          </TextButton>
          <TextButton
            onPress={this.handleIncorrect}
            buttonStyle={{ backgroundColor: red }}
          >
            Incorrect
          </TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  question: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 24,
    color: blue,
    textAlign: "center"
  },
  paging: {
    fontSize: 18,
    color: blue
  }
});

function mapStateToProps(state, { route }) {
  const { title } = route.params;
  return {
    title,
    questions: state[title].questions
  };
}

export default connect(mapStateToProps)(Quiz);
