import { WINNER_COMBOS} from "../constants.js"

export const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      //revisamos todas las combinaciones ganadoras
      //para ver si X u O gano
      const [a, b, c] = combo

      if(
        boardToCheck[a] && //0 -> x u o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
      {
        return boardToCheck[a] //x u o
      }
    }

    return null
  }