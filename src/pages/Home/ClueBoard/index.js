import React, { Fragment } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClueBoard = ({ wordsToGuess, gameOver }) => {
  console.log("WORRDSD  TO GUESS", wordsToGuess)
  return (
    <Fragment>
      <div className="clue-header">Word Clues</div>
      {wordsToGuess.map((words) => (
        <div key={words.word} className="clues">
         <div className="word-header">
          {!gameOver ? (
            <div className="word-name">{words.word.charAt(0).toUpperCase()} _ _ _ _ _</div>
          ) : (
            <div className="word-name">{words.word.toUpperCase()}</div>
          )}
          <div className="show-clue-but"><span> Show Clue <FontAwesomeIcon icon={`eye`} /></span></div>
        </div>
          <div className="definition">{
            words.defs.map((w, i)=>(
              <div key={i}>{(()=>{
                const splitWord = w.split('\t');
                return `(${splitWord[0]}) ${splitWord[1]}`
              })()}</div>
            ))
          }</div>
        </div>
      ))}
    </Fragment>
  );
};

export default ClueBoard;
