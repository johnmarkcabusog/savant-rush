import React, { Fragment } from "react";
import  './style.css'

const ClueBoard = ({wordsToGuess}) => {
  return (
    <Fragment>
        {wordsToGuess.map(words=>(
             <div key={words.word} className="clues">
                <div>{words.word.toUpperCase()}</div>
                <div>{words.defs[0]}</div>
                </div>
        ))}

    </Fragment>
  );
};

export default ClueBoard;
