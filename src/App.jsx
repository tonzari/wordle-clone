import { useEffect, useState } from 'react'
import './App.css'
import data from './data/answers.json'
import WinModal from './WinModal'

function App() {

  const [guess, setGuess] = useState('')
  const [answer, setAnswer] = useState('')
  const [gameBoardData, setGameBoardData] = useState([])
  const [currentRow, setCurrentRow] = useState(0)
  const [hasWon, setHasWon] = useState(false)

  useEffect(() => {
    const nextAnswer = getRandomAnswer()
    setAnswer(nextAnswer)

    const emptyBoard = () => {
      return [...Array(6)].map(() => {
        return [...Array(5)].map(() => {
          return {
            letter: ' ',
            color: 'incorrect'
          }
        })
      })
    }

    setGameBoardData(emptyBoard)

  },[])
  
  function handleGuess(event){
    event.preventDefault()

    const completedRow = [];

    if(guess.length !== 5) return
    if(!checkIsValidWord(guess)) return

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

    // state    
    const newGameData = [...gameBoardData]
    newGameData[currentRow] = completedRow
    setGameBoardData(newGameData)
    setCurrentRow(currentRow+1)
    setGuess('')

    if(guess === answer) setHasWon(true)
  }

  function checkIsValidWord(guess) {
    // add spell check feature
    // for now just alwasy return true
    
    return true
  }

  function getRandomAnswer() {
    // add random feature
    // for now always return 0 index

    return data.answers[0]
  }

  return (
    <div className='site-wrapper'>

      {hasWon && <WinModal />}

      <h1>Wordle Clone</h1>     
      
      <div className='gameboard'>
        {
          gameBoardData.map((row) => {
            return row.map((tile,i) => {
              return <div key={i} className={tile.color + " tile"}>{tile.letter}</div>
            })
          })
        }
      </div>

      <form onSubmit={(e)=>{handleGuess(e)}}>
        <div>
          <label htmlFor="guess">Enter word: </label>
          <input
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
