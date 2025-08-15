import { useState } from 'react'
import './index.css'
import clsx from "clsx";
import { getFarewellText } from './utils';
import { getRandomWord } from './utils';
import Confetti from 'react-confetti';

export default function App() {
  // An array of our chips 
  const chips = [
    {name: "HTML", color: "bg-orange-400"},
    {name: "CSS", color: "bg-blue-500"},
    {name: "Javascript", color: "bg-yellow-600"},
    {name: "React", color: "bg-sky-500"},
    {name: "Typescript", color: "bg-orange-600"},
    {name: "NodeJS", color: "bg-green-600"},
    {name: "Python", color: "bg-orange-600"},
    {name: "Ruby", color: "bg-red-600"},
    {name: "Assembly", color: "bg-blue-700"}
  ]

  // Create state to save our current word
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())

  // Alphabet to store letters 
  const alphabet = "qwertyuiopasdfghjklzxcvbnm"

  // Array to store user's guessed letters
  const [guessedLetter, setGuessedLetter] = useState([])

  // Variable to store the number of wrong guesses
  let wrongGuessCount = guessedLetter.filter(item => ![...currentWord].includes(item.toLowerCase()))
  
  // Variable to store current guessed letter
  const currentGuess = guessedLetter[guessedLetter.length -1]


  // Map over our chips to render the languages
  const language = chips.map((item, index) => {
    return (
      <div 
        key={item.name} 
        className={clsx(
          `${wrongGuessCount[index] ? "bg-gray-600" : item.color} text-center py-1 w-20`,
          wrongGuessCount[index] && "line-through"
          )}
        >{wrongGuessCount[index] ? "💀": item.name }
      </div>
    )
    })

  // Function to store letter and color results in array
  function saveLetter(value) {
    setGuessedLetter(prevItem =>
      prevItem.includes(value) ? prevItem :
      [...prevItem, value]
    )
  }

  // Create variables to determine game winning conditions
  const isGameLost = wrongGuessCount.length >= chips.length
  const isGameWon = [...currentWord].every(item => guessedLetter.includes(item.toUpperCase()))
  const isGameOver = isGameLost || isGameWon

  // Map over game word and check if it was guessed
  const gameWord = [...currentWord].map((item, index) => {
    const correctMatch = guessedLetter.includes(item.toUpperCase())
    return (
      <div 
        key={index} 
        className={clsx(
            "border-b bg-gray-800 px-3 py-1",
            correctMatch && "text-white",
            (!correctMatch && !isGameLost) && "text-gray-800",
            (!correctMatch && isGameLost) && "text-red-500"
            )}>
          {item.toUpperCase()}</div>
  )})

  //Map over alphabet to render it below
  const keyboard = [...alphabet].map(item => {
    const letter = item.toUpperCase();
    const isGuessedCorrect =
      guessedLetter.includes(letter) && currentWord.toUpperCase().includes(letter);
    const isGuessedWrong =
      guessedLetter.includes(letter) && !currentWord.toUpperCase().includes(letter);

    return ( 
      <button 
        onClick={() => saveLetter(letter)} 
        disabled={isGameOver ? true: false}
        aria-disabled={guessedLetter.includes(letter)}
        aria-label={`Letter ${letter}`}
        key={item} 
        className={clsx(
          "py-1 px-3 cursor-pointer text-black",
          !guessedLetter.includes(letter) && "bg-yellow-400 hover:bg-yellow-500",
          isGuessedCorrect && "bg-green-500 hover:bg-green-600",
          isGuessedWrong && "bg-red-500 hover:bg-red-600"
        )}
      >
        {letter}
      </button>
    );
  });

  // Function start a new game (reset)
  function reset() {
    setCurrentWord(getRandomWord())
    setGuessedLetter([])
  }

  return (
    <>
    <main className="bg-black text-white px-5 h-screen py-3 flex flex-col gap-5 items-center">
      {/* If game is won completely */}
      {isGameWon && <Confetti />}
      <header className="text-center flex flex-col gap-5">
        <h1 className="text-2xl">Assembly: Endgame</h1>
        <p className="text-gray-400">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      {/* Game status display, depending on game conditions */}
      {isGameWon && <section className="status bg-green-700">
        <h1 className="text-xl font-semibold">You win!</h1>
        <p>Well done!</p>
      </section>}
      {isGameLost && <section className="status bg-red-700">
        <h1 className="text-xl font-semibold">Game over!</h1>
        <p>You lose! Better start learning assembly.</p>
      </section>}
      {/* If game is not over  */}
      {!isGameOver && <section className="w-full flex justify-center">
        {/* When you make a mistake */}
        { guessedLetter.length > 0 && !currentWord.includes(currentGuess.toLowerCase()) ? 
        <div className="status bg-purple-700">
          <h1>{getFarewellText(chips[wrongGuessCount.length - 1].name)}</h1>
        </div> : 
        // When you don't make a mistake
        <div className="status"></div>}
        </section>}
      {/* Chips section to show the programming languages to save  */}
      <section id="chips" className="flex flex-wrap gap-1 justify-center">
        {language}
      </section>
      {/* section to show the game word  */}
      <section id="word" className="flex gap-1 text-2xl justify-center">
        {gameWord}
      </section>
      <section id="alphabet" className="flex flex-wrap gap-1 justify-center w-87 sm:w-94">
        {keyboard}
      </section>
      {isGameOver && 
      <button 
      onClick={reset}
      className="py-1 w-50 bg-sky-700 hover:bg-sky-900 cursor-pointer font-semibold text-xl">
        New Game</button>}
    </main>
    </>
  )
}
