import { type FormEvent } from "react"
import { useGuessNumber } from "@/utils";
import "./GuessNumber.css"

const GuessNumberSection = () => {
  const { state, resetGame, makeGuess, setGuess } = useGuessNumber()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = Number(state.guess.trim())

    if (!state.guess.trim() || Number.isNaN(value) || value < 1 || value > 100) {
      return
    }

    makeGuess(value)
  }

  return (
    <section className="game-section guess-number-section">
      <h2>Вгадай число, яке загадав комп’ютер</h2>
      <form className="guess-number-form" onSubmit={handleSubmit}>
        <input
          value={state.guess}
          onChange={(event) => setGuess(event.target.value)}
          placeholder="Введіть число"
          inputMode="numeric"
          pattern="[0-9]*"
          disabled={state.won}
        />
        <button type="submit" disabled={state.won}>
          Вгадати
        </button>
      </form>
      <p className="result-text">{state.feedback}</p>
      <button className="secondary-button" type="button" onClick={resetGame}>
        Нова гра
      </button>
    </section>
  )
}

export default GuessNumberSection
