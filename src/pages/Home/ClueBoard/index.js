import React, { Fragment } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClueBoard = ({ wordsToGuess, gameOver, setTheWordsToGuess }) => {
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
          <div className="show-clue-but"><span onClick={()=>{
            const clonedWordsToGuess = [...wordsToGuess];
            const foundIndex = clonedWordsToGuess.findIndex(x=> x.word === words.word);
            clonedWordsToGuess[foundIndex].shownClue = clonedWordsToGuess[foundIndex].shownClue + 1;
            setTheWordsToGuess(clonedWordsToGuess)
          }}> Show Clue <FontAwesomeIcon icon={`eye`} /></span></div>
        </div>
          <div className="definition">{
            words.defs.map((w, i)=>(
              <div key={i}>{(()=>{
                if(i <= words.shownClue){
                  const splitWord = w.split('\t');
                  return <span className="word-def">{`(${splitWord[0]}) ${splitWord[1]}`}</span> 
                }else{
                  return <div className="hidden-defs"></div>
                }
             
              })()}</div>
            ))
          }</div>
        </div>
      ))}
    </Fragment>
  );
};

export default ClueBoard;
