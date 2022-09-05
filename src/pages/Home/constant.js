export const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","w","y"];
export const ROW_COUNT = 6;
export const COLUMN_COUNT = 6;

export const getRandomTwoLetters = () =>{
    const letter1 = alphabet[Math.floor(Math.random()* alphabet.length)]
    const letter2 = alphabet[Math.floor(Math.random()* alphabet.length)]
    return [letter1, letter2]
}
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
