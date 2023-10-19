import { useEffect, useState } from 'react'
import './App.css'
import data from './data/answers.json'
import EndGameModal from './EndGameModal'
import GameBoard from './GameBoard'

function App() {

  const [guess, setGuess] = useState('')
  const [answer, setAnswer] = useState('')
  const [gameBoardData, setGameBoardData] = useState([])
  const [currentRow, setCurrentRow] = useState(0)
  const [gameState, setGameState] = useState('playing')

  useEffect(() => {
    const nextAnswer = getRandomAnswer()
    setAnswer(nextAnswer)

    const emptyBoard = () => {
      return [...Array(6)].map(() => {
        return [...Array(5)].map(() => {
          return {
            letter: ' ',
            color: 'empty'
          }
        })
      })
    }

    setGameBoardData(emptyBoard)

  },[])
  
  function handleGuess(event){
    event.preventDefault()

    // store each letter of guess in this array
    const completedRow = [];

    if(guess.length !== 5) return
    if(!checkIsValidWord(guess)) return

    // process each letter, add a color to be used for styling the tile
    Array.from(guess).forEach((letter, index) => {
      if(letter===answer.charAt(index)) {
        completedRow.push({letter, color:'green'})
      }
      else if(answer.includes(letter))  {
        completedRow.push({letter, color:'yellow'})
      }
      else {
        completedRow.push({letter, color:'incorrect'})
      }
    })

    // replace empty gameboard row with new completedRow, set state  
    const newGameData = [...gameBoardData]
    newGameData[currentRow] = completedRow
    setGameBoardData(newGameData)
    setCurrentRow(currentRow + 1)
    setGuess('')

    if(guess === answer) setGameState("won")
    if(currentRow + 1 === 6) setGameState("lost")
  }

  function checkIsValidWord(guess) {
    // add spell check feature
    // for now just alwasy return true
    
    return true
  }

  function getRandomAnswer() {
    const randomIndex = Math.floor(Math.random() * data.answers.length);

    return data.answers[randomIndex]
  }

  return (
    <div className='site-wrapper'>

      {gameState !== 'playing' && <EndGameModal gameState={gameState} answer={answer} />}

      <h1>Wordle Clone</h1>     
      
      <GameBoard gameBoardData={gameBoardData}/>

      <form onSubmit={(e)=>{handleGuess(e)}}>
        <div>
          <label htmlFor="guess">Enter word: </label>
          <input
            required
            minLength={5}
            maxLength={5}
            type="text" 
            name="guess"
            value={guess}
            onChange={(event)=>{setGuess(event.target.value)}}
          />
        </div>
      </form>
    </div>
  )
}

export default App
