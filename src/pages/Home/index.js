import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { shuffle, combineString, removeAllSelectedClass } from "./utils";
import Timer from "./Timer";
import TileAnswer from "./TileAnswer";
import Tiles from "./Tiles";
import ClueBoard from "./ClueBoard";

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
        setTheWordsToGuess(data);
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

  console.log("gameee over", gameOver )
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
      <div className="clue-board"> <ClueBoard wordsToGuess={wordsToGuess}/></div>
    </div>
  );
};

export default Home;
