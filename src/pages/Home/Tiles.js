import React from "react";
import { applySelectedClassToTile } from "./utils";

const Tiles = ({ combinedString, setUserAnswer, userAnswer }) => {
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
            if (userAnswer.length <= 5 && !isTileAlreadyClicked) {
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

  