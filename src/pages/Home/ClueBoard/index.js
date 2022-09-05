import React, { Fragment } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClueBoard = ({
  wordsToGuess,
  gameOver,
  setTheWordsToGuess,
  correctAnswers,
  setShowClue
}) => {
  return (
    <Fragment>
      <div className="clue-header">Word Clues</div>
      {wordsToGuess.map((words) => {
        const answerIsFound = correctAnswers.find((x) => x.word === words.word);
        const isFound = Boolean(answerIsFound);
        const allCluesShown = words.shownClue >= words.defs.length - 1; // subtract 1 for the initial  shown answer
        return (
          <div key={words.word} className="clues">
            <div className="word-header">
              {!gameOver && !isFound ? (
                <div className="word-name">
                  {words.word.charAt(0).toUpperCase()} _ _ _ _{" "}
                  {words.word.charAt(5).toUpperCase()}
                </div>
              ) : (
                <div className="word-name shown">
                  {words.word.toUpperCase()}
                </div>
              )}

              {!allCluesShown && (
                <div className="show-clue-but">
                  <span
                    onClick={() => {
                      const clonedWordsToGuess = [...wordsToGuess];
                      const foundIndex = clonedWordsToGuess.findIndex(
                        (x) => x.word === words.word
                      );
                      clonedWordsToGuess[foundIndex].shownClue =
                        clonedWordsToGuess[foundIndex].shownClue + 1;
                      setTheWordsToGuess(clonedWordsToGuess);
                      setShowClue(1);
                    }}
                  >
                    <FontAwesomeIcon icon={`eye`} />
                  </span>
                </div>
              )}
            </div>

            <div className="definition">
              {words.defs.map((w, i) => (
                <div key={i}>
                  {(() => {
                    if (i <= words.shownClue) {
                      const splitWord = w.split("\t");
                      return (
                        <span className="word-def">{`(${splitWord[0]}) ${splitWord[1]}`}</span>
                      );
                    } else {
                      return <div className="hidden-defs"></div>;
                    }
                  })()}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ClueBoard;
