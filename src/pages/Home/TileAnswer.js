import React from 'react'
import { removeSelectedClassFromTile } from "./utils";

import { ROW_COUNT } from "./constant";

const TileAnswer = ({ userAnswer, setUserAnswer}) => {
    const t = []
    for (let i = 0; i < ROW_COUNT; i++) {
      t.push(
        <div
          key={i}
          className="tile-answer-item"
          onClick={() => {
            if(i < userAnswer.length){
              removeSelectedClassFromTile(userAnswer[i].tile_pos)
              const clonedUserAnswer = [...userAnswer];
              const index = clonedUserAnswer.findIndex(x=>x.tile_pos ===userAnswer[i].tile_pos)
              clonedUserAnswer.splice(index,1);
              setUserAnswer(clonedUserAnswer);
            }
           
          }}
        >
          {i < userAnswer.length
            ? userAnswer[i].tile_letter.toUpperCase()
            : ""}
        </div>
      );
    }
    return t;
  };

  export default TileAnswer