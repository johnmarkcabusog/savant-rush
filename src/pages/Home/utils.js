import { alphabet, ROW_COUNT, COLUMN_COUNT } from "./constant";

// Fisher-Yates Shuffle algorithm O(n)
export const shuffle = (array) => {
  let currentLength = array.length;
  let temporaryPos;
  let randomIndex;

  while (currentLength !== 0) {
    randomIndex = Math.floor(Math.random() * currentLength);
    temporaryPos = array[randomIndex]; // put the random element in temporary position
    currentLength--;

    // get the last elements and put it in the position of random picked element;
    array[randomIndex] = array[currentLength];

    // put the random picked element at the END of the array
    array[currentLength] = temporaryPos;
  }
  return array;
};

export const combineString = (wordsToGuess) => {
  const allTiles = ROW_COUNT * COLUMN_COUNT;
  let str = "";
  wordsToGuess.forEach((word) => {
    str = str.concat(word);
  });
  for (let i = str.length; i < allTiles; i++) {
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    str = str.concat(letter);
  }
  return str;
};

export const applySelectedClassToTile = (tilePosition) => {
  const elementTile = document.getElementsByClassName(tilePosition);
  if (elementTile.length > 0) {
    elementTile[0].classList.add("selected");
  }
};

export const removeSelectedClassFromTile = (tilePosition) => {
  const elementTile = document.getElementsByClassName(tilePosition);
  if (elementTile.length > 0) {
    elementTile[0].classList.remove("selected");
  }
};

export const removeAllSelectedClass = (userAnswer) => {
  userAnswer.forEach((t) => {
    removeSelectedClassFromTile(t.tile_pos);
  });
};
