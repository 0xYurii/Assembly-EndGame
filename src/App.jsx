import { useState } from "react"
import { languages } from "./lanuguages"
import { clsx } from "clsx"

/**
 * Goal: Add in the incorrect guesses mechanism to the game
 * 
 * Challenge: Derive a variable (`wrongGuessCount`) for the 
 * number of incorrect guesses by using the other state 
 * values we're already holding in the component.
 * 
 * console.log the wrongGuessCount for now
 */

export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState("react")
    const [guessedLetters, setGuessedLetters] = useState([])


    //derive variable
    const [wrongGuessCount, setWrongGuessCount] = useState(0)

    console.log(wrongGuessCount)

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
      if(currentWord.includes(letter)){
        // correct guess, don't change count
      } else {
        setWrongGuessCount(prev => prev + 1)
      }
      setGuessedLetters(prevLetters =>
          prevLetters.includes(letter) ?
              prevLetters :
              [...prevLetters, letter]
      )
    }

    const languageElements = languages.map(lang => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
            <span
                className="chip"
                style={styles}
                key={lang.name}
                
            >
                {lang.name}
            </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => {
      const isGuessed=guessedLetters.includes(letter)
      const isTrue=isGuessed && currentWord.includes(letter)

      return(
        isTrue ? <span key={index}>{letter.toUpperCase()}</span>: <span key={index}>_</span>
      )
    })

    const keyboardElements = alphabet.split("").map(letter => {
      const isGuessed=guessedLetters.includes(letter)
      const isTrue=isGuessed && currentWord.includes(letter)
      const isWrong=isGuessed && !currentWord.includes(letter)

      const classGame=clsx({
        true:isTrue,
        wrong:isWrong
      })
      
      return(
        <button
            key={letter}
            onClick={() => addGuessedLetter(letter)}
            className={classGame}
        >
            {letter.toUpperCase()}
        </button>
      )
    }
    )

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
            </header>

            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </section>

            <section className="language-chips">
                {languageElements}
            </section>

            <section className="word">
                {letterElements}
            </section>

            <section className="keyboard">
                {keyboardElements}
            </section>

            <button className="new-game">New Game</button>
        </main>
    )
}
