import { type FormEvent } from "react"
import { useCalculator } from "../../../utils"
import "./Calculator.css"

const CalculatorSection = () => {
  const { state, setFirstValue, setSecondValue, setOperator, calculate, reset } = useCalculator()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    calculate()
  }

  return (
    <section className="game-section calculator-section">
      <h2>Калькулятор</h2>
      <form className="calculator-form" onSubmit={handleSubmit}>
        <input
          value={state.firstValue}
          onChange={(event) => setFirstValue(event.target.value)}
          placeholder="Введіть число"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <div className="calculator-operators">
          {['+', '-', '*', '/'].map((operator) => (
            <button
              key={operator}
              type="button"
              className={state.operator === operator ? 'active' : ''}
              onClick={() => setOperator(operator)}
            >
              {operator}
            </button>
          ))}
        </div>
        <input
          value={state.secondValue}
          onChange={(event) => setSecondValue(event.target.value)}
          placeholder="Введіть число"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <button className="equal-button" type="submit">
          =
        </button>
      </form>
      <p className={`result-text ${state.error ? 'error' : ''}`}>
        {state.error || `Результат: ${state.result}`}
      </p>
      <button className="secondary-button" type="button" onClick={reset}>
        Скинути
      </button>
    </section>
  )
}

export default CalculatorSection
