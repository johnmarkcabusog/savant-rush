import React from "react";
import { applySelectedClassToTile } from "./utils";

const Tiles = ({ combinedString, setUserAnswer, userAnswer,correctAnswers }) => {
    const t = [];
    for (let i = 0; i < combinedString.length; i++) {
      t.push(
        <span
          key={i}
          className={`tile tile-${i + 1}`}
          onClick={() => {
            let clonedUserAnswer = [...userAnswer];
            const tilePos = `tile-${i + 1}`;
            const isTileAlreadyClicked = clonedUserAnswer.find(x=> x.tile_pos === tilePos)

            const isTileAlreadyCorrect = (()=>{
              // if tile is already correctly selected then dont allow clicking
                let isCorrect = false
                correctAnswers.every((x)=>{
                  if(!x.word.includes(combinedString[i])){
                    return false;
                  } else {
                    const found = x.word_tile_positions.find(w=> w.tile_pos === tilePos);
                    if(found){
                      isCorrect = true;
                      return false;
                    }
                  }
                  return true
                })
                return isCorrect
            })()

            
            if (userAnswer.length <= 5 && !isTileAlreadyClicked && !isTileAlreadyCorrect) {
              applySelectedClassToTile(tilePos);
              clonedUserAnswer.push({
                tile_letter: combinedString[i],
                tile_pos: tilePos,
              });
              setUserAnswer(clonedUserAnswer);
            }
          }}
        >
          {combinedString[i].toUpperCase()}
        </span>
      );
    }
    return t;
  };

  export default Tiles

  