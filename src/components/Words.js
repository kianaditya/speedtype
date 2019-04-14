import randomWords from "random-words";
import React, { Component } from "react";
import Word from "./Word";
import Letter from "./Letter";
import "./Words.css";

export class Words extends Component {
  state = {
    words: [],
    letters: [],
    totalKeyStrokes: 0,
    correctKeyStrokes:0
  };

  componentDidMount() {
    const words = randomWords(3);
    this.setState({ words: words });
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = e => {
    const previousLetters = [...this.state.letters];
    if (e.key === "Backspace") {
      this.setState({ letters: previousLetters.slice(0, -1) });
    }
    if (e.key === "Enter") {
      this.compareSolution();
    }
    if (e.key.length === 1) {
      const letters = previousLetters.concat(e.key);
      this.setState({ letters: letters,totalKeyStrokes: this.state.totalKeyStrokes + 1 });
    }
  };

  compareWords = (word, letters) => {
    const finalWord = word.map((letter, index) => {
      const wordToCompare = word.slice(0, index + 1).join("");
      const lettersToCompareWith = letters.slice(0, index + 1).join("");
      if (wordToCompare === lettersToCompareWith) {
        return <Letter letter={letter} highlighted="highlighted" />;
      } else {
        return <Letter letter={letter} highlighted="" />;
      }
    });
    return finalWord;
  };

  compareSolution() {
    const solution = this.state.letters.join("");
    const words = this.state.words.map(word => {
      if (word === solution) {
        this.setState({correctKeyStrokes: this.state.correctKeyStrokes + word.length})
        return randomWords();
      } else {
        return word;
      }
    });
    this.setState({ words: words, letters: [] });
  }

  render() {
    const words = this.state.words.map(word => {
      return (
        <Word
          word={word}
          compareWords={this.compareWords}
          letter={this.state.letters}
        />
      );
    });

    return (
      <div className="mainContainer">
        <div>{words} </div>
        <div className="inputField">{this.state.letters}</div>
        <h3>Total keystrokes: {this.state.totalKeyStrokes}</h3>
        <h3>Correct KeyStrokes: {this.state.correctKeyStrokes}</h3>
        <h3>Accuracy: {this.state.totalKeyStrokes > 0 ? Math.round (this.state.correctKeyStrokes*100/this.state.totalKeyStrokes) : 0} %</h3>
      </div>
    );
  }
}

export default Words;
