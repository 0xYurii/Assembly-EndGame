import React from "react"
import { languages } from "./lanuguages"

export default function AssembleyEndgame() {
  const lanuguageChip=languages.map(lang=>{
    const styles={
      backgroundColor:lang.backgroundColor,
      color:lang.color
    }
    return(
      <span
      key={lang.name} 
      className="chip" 
      style={styles}
      > {lang.name} </span>
    )
  })
  return (
      <main>
          <header>
            <h1>Assembly: Endgame</h1>
          
            <p>Guess the word in under 8 attemps to keep the programming world safe from Assembley!</p>
          </header>
          <section className="game-status">
              <h2>You win!</h2>
              <p>Well done! 🎉</p>
          </section>
          <section className="lanuguage-chips">
            {lanuguageChip}
          </section>
      </main>
  )
}
