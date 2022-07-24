import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { shuffle, combineString, removeAllSelectedClass } from "./utils";
import Timer from "./Timer";
import TileAnswer from "./TileAnswer";
import Tiles from "./Tiles";
import ClueBoard from "./ClueBoard";

const massageData = data=>{
  console.log("massageData", data)
  let massagedData = data.map((data)=>{
      // check if data has defintion, else don't  include
      if(data.hasOwnProperty('defs')){
        if(data.defs.length > 0){
           let definition_list=[];
           if(data.defs.length > 3){
            // get the first 3 defintion
            definition_list = [data.defs[0], data.defs[1], data.defs[2]]
           }else{
            definition_list = data.defs;
            // get all defiintion
           }
           return {word:data.word, defs: definition_list, shownClue:0}
        }
      }
  });
  return massagedData;
}

const Home = () => {
  const [wordsToGuess, setTheWordsToGuess] = useState([]);
  const [boardLetters, setBoardLetters] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (wordsToGuess.length === 0) {
      const fetchData = async () => {
        const { data } = await axios.get(
          "https://api.datamuse.com/words?sp=??????&md=d&max=5"
        );
        const words = data.map((x) => x.word);
        const combinedString = combineString(words); //combine strings to attach each letter to the tiles
        const shuffledcombinedString = shuffle(combinedString.split(""));
        setBoardLetters(shuffledcombinedString);
        setTheWordsToGuess(massageData(data));
      };

      fetchData();
    }
  }, [wordsToGuess]);

  // answer checker so it doesn't always check when the correct ans
  useEffect(() => {
    if (userAnswer.length === 6) {
      const userGuess = (() => {
        let str = "";
        userAnswer.forEach((l) => {
          str = str.concat(l.tile_letter);
        });
        return str;
      })();
      const answerCorrect = wordsToGuess.find((x) => x.word === userGuess);
      if (answerCorrect) {
        let clonedCorrectAnswers = [...correctAnswers];
        clonedCorrectAnswers.push({word_tile_positions: userAnswer, word: userGuess});
        setCorrectAnswers(clonedCorrectAnswers);
        setUserAnswer([]);
        removeAllSelectedClass(userAnswer);
      }
    }
  }, [userAnswer,correctAnswers, wordsToGuess]);

  // only trigger tile color updates for correct answer tiles
  useEffect(()=>{
    correctAnswers.forEach((x, index)=>{
      const { word_tile_positions} = x;
      word_tile_positions.forEach(w=>{
        const elementTile = document.getElementsByClassName(w.tile_pos);
        if(elementTile.length > 0){
          elementTile[0].classList.add(`correct-answer-${index}`);
        }
      })
    
    })
  },[correctAnswers])
  
  return (
    <div className="main-panel">
      <div className="game-board">
        <div>Savant Rush</div>
        <Timer setGameOver={setGameOver} />
        <div className="board">
          <Tiles
            combinedString={boardLetters}
            setUserAnswer={setUserAnswer}
            userAnswer={userAnswer}
          />
        </div>
        <div className="tile-answer">
          <TileAnswer userAnswer={userAnswer} setUserAnswer={setUserAnswer} />
        </div>
      </div>
      <div className="clue-board"> <ClueBoard wordsToGuess={wordsToGuess} gameOver={gameOver}/></div>
    </div>
  );
};

export default Home;
