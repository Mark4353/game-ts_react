import { type FormEvent } from "react"
import { useTimeCalculator } from "../../../utils"
import "./TimeCalculator.css"

const TimeCalculatorSection = () => {
  const { state, setSeconds, calculate, reset } = useTimeCalculator()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    calculate()
  }

  return (
    <section className="game-section time-calculator-section">
      <h2>Калькулятор часу</h2>
      <form className="time-calculator-form" onSubmit={handleSubmit}>
        <input
          value={state.seconds}
          onChange={(event) => setSeconds(event.target.value)}
          placeholder="Введіть число"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <button className="search-button" type="submit">
          Розрахувати час
        </button>
      </form>
      <p className="result-text">{state.message}</p>
      <button className="secondary-button" type="button" onClick={reset}>
        Очистити
      </button>
    </section>
  )
}

export default TimeCalculatorSection
