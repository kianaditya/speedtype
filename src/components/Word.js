import React from "react";

const Word = props => {
  let letters = props.word.split("");
  letters = props.compareWords(letters, props.letter);
  return <div style={{padding: '10px 0px'}}>{letters}</div>;
};

export default Word;
