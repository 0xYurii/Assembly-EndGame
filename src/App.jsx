import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "./lanuguages"
import {getFarewellText,randomWord} from "./utils"

/**
 * Backlog:
 * 
 * ✅ Farewell messages in status section
 * ✅ Disable the keyboard when the game is over
 * ✅ Fix a11y issues
 * ✅ Choose a random word from a list of words
 * ✅ Make the New Game button reset the game
 * - Reveal what the word was if the user loses the game
 * - Confetti drop when the user wins
 * 
 * Challenge: Reveal the missing letters of the word if the user
 * loses the game. Style the missing letters to have the same red
 * color as the wrong letter keys.
 */

export default function AssemblyEndgame() {
    // State values
    const [currentWord, setCurrentWord] = useState(()=> randomWord())
    console.log(currentWord)
    const [guessedLetters, setGuessedLetters] = useState([])

    
    // New Game function
    function newGame(){
      setCurrentWord(()=> randomWord())
      setGuessedLetters(()=>[])
    }

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

    //displaying the currentWord 
    const letterElements = currentWord.split("").map((letter, index) => { 
      const shouldRevealLetter=isGameLost || guessedLetters.includes(letter) 
      const missedLetter=clsx(
        isGameLost && !guessedLetters.includes(letter) && "missed-letter"
      )
      return(
      <span key={index} className={missedLetter}>
        {shouldRevealLetter? letter.toUpperCase() : ""}
      </span>
        
      )}
     

    )

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
                disabled={isGameOver}
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
            {isGameOver  && <button className="new-game" onClick={newGame}>New Game</button>}
        </main>
    )
}
