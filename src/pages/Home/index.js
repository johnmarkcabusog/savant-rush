import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { alphabet, ROW_COUNT, COLUMN_COUNT } from "./constant";

const allTiles = ROW_COUNT * COLUMN_COUNT;

const Tiles = ({combinedString, setUserAnswer, userAnswer}) => {
  const t = [];
  for (let i = 0; i < combinedString.length; i++) {
    t.push(<span key={i} className={`tile tile-${i+1}`} onClick={()=>{
      let clonedUserAnswer = [...userAnswer]
      clonedUserAnswer.push(combinedString[i])
      setUserAnswer(clonedUserAnswer)
    }}>{combinedString[i].toUpperCase()}</span>);
  }
  return t;
};

const TileAnswer = ({ userAnswer }) => {
  const t = [];
  for (let i = 1; i <= ROW_COUNT; i++) {
    t.push(
      <div key={i} className="tile-answer-item">{i <= userAnswer.length? userAnswer[i-1].toUpperCase():''}</div>
    );
  }
  return t;
};

// const getPositionSets = ()=>{
//   let sets = [];
//   for(let i=1; i <= ROW_COUNT; i++){
//     // {1,2} {2,3}
//     // let x = x and y = x+1
//     sets.push({x: i, y: i+1})
//   }
//   return sets;
// }

// const tilePositions = ()=>{
//   const tilePositions=[];
//   const gridColumns = getPositionSets();
//   const gridRows = getPositionSets();
//   let count = 1;
//   gridColumns.forEach(({x: col_x,y: col_y})=>{ // intersect column sets with row sets
//     gridRows.forEach(({x:row_x, y:row_y})=>{
//       tilePositions.push({position_id:count,col_x,grid_column:[col_x, col_y], grid_row:[row_x, row_y]})
//       count++
//     })
//   })
//   return tilePositions
// }

const combineString = (wordsToGuess)=>{
  let str = '';
  wordsToGuess.forEach(word => {
     str = str.concat(word);
  });
  for(let i = str.length ; i<allTiles ; i++){
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];

    str = str.concat(letter)
  }
  return str;
}


// Fisher-Yates Shuffle algorithm O(n)
const shuffle = (array)=> {
  let currentLength = array.length;
  let temporaryPos;
  let randomIndex;

  while(currentLength !==0){
    randomIndex = Math.floor(Math.random() * currentLength);
    temporaryPos = array[randomIndex] // put the random element in temporary position
    currentLength --;

    // get the last elements and put it in the position of random picked element;
    array[randomIndex]= array[currentLength];

    // put the random picked element at the END of the array
    array[currentLength] = temporaryPos;
  }
  return array;
}

const Home = () => {
  const [wordsToGuess, setTheWordsToGuess] = useState([]);
  const [boardLetters, setBoardLetters] = useState([]);
  const [timer, setTimer] = useState(300);
  const [userAnswer, setUserAnswer] = useState([]);
  useEffect(() => {
    if(wordsToGuess.length === 0){
      const fetchData = async () => {
        const { data } = await axios.get(
          "https://api.datamuse.com/words?sp=??????&md=d&max=6"
        );
        const words = data.map((x) => x.word);
        setTheWordsToGuess(words);
      
        const combinedString = combineString(wordsToGuess); //combine strings to attach each letter to the tiles
        const shuffledcombinedString= shuffle(combinedString.split(''));
        setBoardLetters(shuffledcombinedString);
      };
    
      fetchData();
    }
  }, [wordsToGuess]);

  useEffect(() =>{
      const interval = setInterval(()=>{
        if(timer > 0){
          setTimer(timer-1);
        }
      },1000)
    return () => clearInterval(interval)
  },[timer])
  
  return (
    <div className="main-panel">
      <div className="game-board">
        <div>Savant Rush</div>
        {timer > 0 ?(
        <div>{timer}</div>
        ):(
          <div>Times Up!</div>
        )}
        <div className="board">
          <Tiles combinedString={boardLetters} setUserAnswer={setUserAnswer} userAnswer={userAnswer}/>
        </div>
        <div className="tile-answer">
          <TileAnswer userAnswer={userAnswer} />
        </div>
      </div>
      <div className="clue-board"></div>
    </div>
  );
};

export default Home;
