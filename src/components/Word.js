import React from "react";

const Word = props => {
  let letters = props.word.split("");
  letters = props.compareWords(letters, props.letter);
  return <div>{letters}</div>;
};

export default Word;
