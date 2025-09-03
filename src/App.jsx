import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "./lanuguages"
import {getFarewellText} from "./utils"

/**
 * Challenge: Bid farewell to each programming language
 * as it gets erased from existance 👋😭
 * 
 * Use the `getFarewellText` function from the new utils.js
 * file to generate the text.
 * 
 * Check hint.md if you're feeling stuck, but do your best
 * to solve the challenge without the hint! 🕵️
 * 
 * You'll need to find a way to know if the most recently-
 * guessed letter was correct or not, so you're only
 * displaying the farewell message after wrong guesses.
 */

export default function AssemblyEndgame() {
    // State values
    const [currentWord, setCurrentWord] = useState("react")
    const [guessedLetters, setGuessedLetters] = useState([])

    
    
    // Derived values
    const wrongGuessCount = 
        guessedLetters.filter(letter => !currentWord.includes(letter)).length

    // new game button
    const isGameWon=currentWord.split('').every(letter=>guessedLetters.includes(letter))
    const isGameLost=wrongGuessCount >= languages.length-1
    const isGameOver= isGameLost || isGameWon


    
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    // 9 languages
    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
        return (
          
            <span
                className={className}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
          
        )
    })

    //displaying the REACR word
    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>
            {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
        </span>
    ))

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        
        return (
            <button
                className={className}
                key={letter}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    // Get the last guessed letter
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]

    // Check if it was wrong
    const isLastGuessWrong = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    const GamewonClass=clsx("game-status",{
      won:isGameWon,
      lose:isGameLost,
      farewell: !isGameOver && isLastGuessWrong
    })

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
            </header>
            <section className={GamewonClass}>
              {isGameOver?(
                isGameWon?
                  <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                  </>:
                  <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                  </>
              )
              
              :(isLastGuessWrong?
                getFarewellText(languages[wrongGuessCount-1].name):
                
                null
                
              )}

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
            {isGameOver  && <button className="new-game">New Game</button>}
        </main>
    )
}
