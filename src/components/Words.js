import randomWords from "random-words";
import React, { Component } from "react";
import Word from "./Word";

export class Words extends Component {
  state = {
    words: [],
    letter: ""
  };

  componentDidMount() {
    const words = randomWords(3);
    this.setState({ words: words });
  }

  registerKeyStroke = e => {
    const letter = e.target.value;
    this.setState({ letter: letter });
    this.compareWords();
  };

  compareWords = () => {
    // some function here
  };

  render() {
    const words = this.state.words.map(word => {
      return <Word word={word} />;
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
