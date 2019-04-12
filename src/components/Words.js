import randomWords from "random-words";
import React, { Component } from "react";

export class Words extends Component {
  state = {
    words: []
  };

  componentDidMount() {
    const words = randomWords(3);
    this.setState({ words: words });
  }
  render() {
    const words = this.state.words.map(word => {
      return <h4>{word}</h4>;
    });

    return <div>{words}</div>;
  }
}

export default Words;
