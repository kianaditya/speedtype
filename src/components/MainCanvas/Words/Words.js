import randomWords from "random-words";
import React, { Component } from "react";
import Word from "./Word/Word";
import Letter from "./Word/Letter";
import "./Words.css";

export class Words extends Component {
  state = {
    words: [],
    letters: [],
    totalKeyStrokes: 0,
    correctKeyStrokes: 0,
    startTime: 0,
    totalTime: 0,
    wordsCount: 0,
    isTyping: false
  };

  componentDidMount() {
    // this.setNewWord();
    const words = randomWords(3);
    this.setState({ words: words });
    window.addEventListener("webkitAnimationEnd", () => {
      // this.setNewWord();
    });
    document.addEventListener("keydown", this.handleKeyDown);
  }

  setNewWord = () => {
    const words = randomWords(1);
    this.setState({ words: words });
    let el = document.getElementsByClassName("wordsTransition")[0];
    el.classList.remove("wordsTransition");
    el.scrollBy(); /* trigger reflow */
    el.classList.add("wordsTransition");
  };

  handleKeyDown = e => {
    const previousLetters = [...this.state.letters];
    this.setState({ isTyping: true, startTime: Date.now() });
    if (e.key === "Backspace") {
      this.setState({ letters: previousLetters.slice(0, -1) });
    }
    if (e.key === "Enter") {
      this.compareSolution();
    }
    if (e.key >= "a" && e.key <= "z") {
      const letters = previousLetters.concat(e.key);
      this.setState({
        letters: letters,
        totalKeyStrokes: this.state.totalKeyStrokes + 1
      });
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
        // this.setNewWord();

        this.setState({
          correctKeyStrokes: this.state.correctKeyStrokes + word.length,
          totalTime: this.state.totalTime + Date.now() - this.state.startTime,
          isTyping: false,
          wordsCount: this.state.wordsCount + 1,
          startTime: 0
        });
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
        <div style={{ display: "flex" }}> {words}</div>
        <div className="inputField">{this.state.letters}</div>
        <h3>Total keystrokes: {this.state.totalKeyStrokes}</h3>
        <h3>Correct KeyStrokes: {this.state.correctKeyStrokes}</h3>
        <h3>
          Accuracy:{" "}
          {this.state.totalKeyStrokes > 0
            ? Math.round(
                (this.state.correctKeyStrokes * 100) /
                  this.state.totalKeyStrokes
              )
            : 0}
          %
        </h3>
        <h3>Correct words: {this.state.wordsCount}</h3>
        <h3>Total time: {this.state.totalTime} seconds</h3>
        <h3>
          Typing speed:{" "}
          {this.state.totalTime > 0
            ? Math.round((this.state.wordsCount * 60) / this.state.totalTime)
            : 0}{" "}
          WPM
        </h3>
      </div>
    );
  }
}

export default Words;
