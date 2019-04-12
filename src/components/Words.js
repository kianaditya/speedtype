import randomWords from "random-words";
import React, { Component } from "react";
import Word from "./Word";
import Letter from "./Letter";

export class Words extends Component {
  state = {
    words: [],
    letters: []
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
      this.setState({ letters: letters });
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
      <div>
        <div>{words} </div>
        <div>{this.state.letters}</div>
      </div>
    );
  }
}

export default Words;
