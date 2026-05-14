import { type FormEvent } from "react"
import { useLeapYear } from "@/utils";
import "./LeapYear.css"

const LeapYearSection = () => {
  const { state, checkYear, setYear } = useLeapYear()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    checkYear(state.year)
  }

  return (
    <section className="game-section leap-year-section">
      <h2>Перевір в який рік ти народився</h2>
      <form className="leap-year-form" onSubmit={handleSubmit}>
        <input
          value={state.year}
          onChange={(event) => setYear(event.target.value)}
          placeholder="Введіть рік народження"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <button type="submit" aria-label="Перевірити">
          Перевірити
        </button>
      </form>
      <p className="result-text">{state.message}</p>
    </section>
  )
}

export default LeapYearSection
