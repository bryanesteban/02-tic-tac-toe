import { useState } from "react"
import confetti from "canvas-confetti"
import { Square }  from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinner } from "./Logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.x)
  const [winner, setWinner] = useState(null) // null es que no hay ganador y que false es que hay un empate


  

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  const checkEndGame = (newBoard) =>{

    return newBoard.every((square) => square != null)
  }

  const updateBoard = (index) => {
    //no actualizar la posicion 
    //si ya tiene algo

    if(board[index] || winner) return
    //actualizar el tablero

      const newBoard = [...board]
      newBoard[index] = turn

      //cambiar el turno
      setBoard(newBoard)

      const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
      setTurn(newTurn)
      //revisar si hay un ganador
      const newWinner = checkWinner(newBoard)
      if(newWinner){
        confetti()
        setWinner(newWinner)
        //alert(`El ganador es ${newWinner}`)
      }else if(checkEndGame(newBoard)){
        setWinner(false)
      }


  }


  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick = {resetGame}>Reset del Juego</button>
      <section className="game">
        {
          board.map((_,index)=> {
            return(
              <Square
                key={index}
                index={index}
                updateBoard = {updateBoard}
              >
                {board[index]}

                </Square>
            )

          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>
          {TURNS.x}
        </Square>

        <Square isSelected={turn === TURNS.o}>
          {TURNS.o}
        </Square>
      </section>
       
        <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}
export default App
