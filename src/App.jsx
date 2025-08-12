import { useState } from 'react'
import './index.css'
import clsx from "clsx";


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
  const [currentWord, setCurrentWord] = useState("React")
  // Map over word to render it below
  const wordGuess = [...currentWord].map((item, index) => 
    <div key={index} className="border-b bg-gray-800 px-3 py-1">{item.toUpperCase()}</div>
  )

  // Alphabet to store letters 
  const alphabet = "qwertyuiopasdfghjklzxcvbnm"

  // Array to store user's guessed letters
  const [guessedLetter, setGuessedLetter] = useState([])
  // Function to store letter and color results in array
  function saveLetter(value) {
    setGuessedLetter(prevItem =>
      prevItem.includes(value) ? prevItem :
      [...prevItem, value]
    )
  }

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
        key={item} 
        className={clsx(
          "keyboard py-1 px-3 cursor-pointer text-black",
          !guessedLetter.includes(letter) && "bg-yellow-400 hover:bg-yellow-500",
          isGuessedCorrect && "bg-green-500 hover:bg-green-600",
          isGuessedWrong && "bg-red-500 hover:bg-red-600"
        )}
      >
        {letter}
      </button>
    );
  });


  return (
    <>
    <main className="bg-black text-white px-5 py-8 flex flex-col gap-10 items-center">
      <header className="text-center flex flex-col gap-5">
        <h1 className="text-2xl">Assembly: Endgame</h1>
        <p className="text-gray-400">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section id="status" className="bg-green-700 text-center py-5 rounded-xl w-full">
        <h1 className="text-xl font-semibold">You win!</h1>
        <p>Well done!</p>
      </section>
      <section id="chips" className="flex flex-wrap gap-1 justify-center">
        {chips.map(item => <div key={item.name} className={`${item.color} text-center py-1 w-20`}>{item.name}</div>)}
      </section>
      <section id="word" className="flex gap-1 text-2xl justify-center">
        {wordGuess}
      </section>
      <section id="alphabet" className="flex flex-wrap gap-1 justify-center w-94">
        {keyboard}
      </section>
      <button className="py-1 w-50 bg-sky-700 hover:bg-sky-900 cursor-pointer font-semibold text-xl">New Game</button>
    </main>
    </>
  )
}
