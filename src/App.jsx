import { useEffect, useState } from 'react'
import './App.css'
import data from './data/answers.json'
import EndGameModal from './EndGameModal'
import GameBoard from './GameBoard'
import Typo from 'typo-js'

function App() {

  const [dictionary, setDictionary] = useState('')
  const [language, setLanguage] = useState('en_US')
  const [guess, setGuess] = useState('')
  const [answer, setAnswer] = useState('')
  const [gameBoardData, setGameBoardData] = useState([])
  const [currentRow, setCurrentRow] = useState(0)
  const [gameState, setGameState] = useState('playing')

  const VALID_LANGUAGES = [
    'en_US',
    'es_MX'
  ];

  useEffect(() => {
    
    setDictionary(new Typo(`${language}`, false, false, { dictionaryPath: "dictionaries" }))
    
    const nextAnswer = getRandomAnswer(language)
    setAnswer(nextAnswer)
    setCurrentRow(0)
    setGameState('playing')

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

  },[language])
  
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

    if(guess === answer) {
      setGameState("won")
      return
    }
    if(currentRow + 1 === 6) {
      setGameState("lost")
      return
    }
  }

  function checkIsValidWord(guess) {    
    return dictionary.check(guess)
  }

  function getRandomAnswer(languageCode) {
    const randomIndex = Math.floor(Math.random() * data.five[languageCode].length);

    return data.five[languageCode][randomIndex]
  }

  return (
    <div className='site-wrapper'>

      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <fieldset>
          <legend>
            Select language:
          </legend>
          
          {VALID_LANGUAGES.map(option => (
            <div key={option}>
              <input
                type="radio"
                name="current-language"
                id={option}
                value={option}
                checked={option === language}
                onChange={event => {
                  setLanguage(event.target.value);
                }}
              />
              <label htmlFor={option}>
                {option}
              </label>
            </div>
          ))}
        </fieldset>
      </form>

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
            onChange={(event)=>{setGuess(event.target.value.toLowerCase())}}
          />
        </div>
      </form>
    </div>
  )
}

export default App
