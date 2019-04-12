import React from "react";
import Letter from "./Letter";

const Word = props => {
  let letters = props.word.split("");
  //   letters = letters.map(letter => {
  //     return <Letter letter={letter} highlighted={props.highlighted} />;
  //   });
  letters = props.compareWords(letters, props.letter);
  return <div>{letters}</div>;
};

export default Word;
