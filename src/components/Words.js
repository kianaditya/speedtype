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
  }

  registerKeyStroke = e => {
    const letters = e.target.value.split("");
    this.setState({ letters: letters });
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
        <input
          value={this.state.letter}
          type="text"
          name="typing"
          onChange={this.registerKeyStroke}
        />
      </div>
    );
  }
}

export default Words;
