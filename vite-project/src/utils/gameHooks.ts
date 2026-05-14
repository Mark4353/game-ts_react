import { useState } from "react"
import {
  generateRandomNumber,
  isLeapYear,
  pickComputerChoice,
  getRoundResult,
  getResultMessage,
} from "../types/gameTypes";

export const useGuessNumber = () => {
  const [state, setState] = useState({
    guess: "",
    target: generateRandomNumber(1, 100),
    feedback: "Спробуйте вгадати число від 1 до 100.",
    attempts: 0,
    won: false,
  })

  const resetGame = () => {
    setState({
      guess: "",
      target: generateRandomNumber(1, 100),
      feedback: "Спробуйте вгадати число від 1 до 100.",
      attempts: 0,
      won: false,
    })
  }

  const makeGuess = (value: number) => {
    if (state.won) return

    const newAttempts = state.attempts + 1

    if (value === state.target) {
      setState(prev => ({
        ...prev,
        attempts: newAttempts,
        won: true,
        feedback: `Вітаю, ви вгадали число ${state.target}! Спроб: ${newAttempts}.`,
      }))
      return
    }

    const feedback = value < state.target
      ? "Занадто мало. Спробуйте більше."
      : "Занадто багато. Спробуйте менше."

    setState(prev => ({
      ...prev,
      attempts: newAttempts,
      feedback,
    }))
  }

  const setGuess = (guess: string) => {
    setState(prev => ({ ...prev, guess }))
  }

  return {
    state,
    resetGame,
    makeGuess,
    setGuess,
  }
}


export const useLeapYear = () => {
  const [state, setState] = useState({
    year: "",
    message: "",
  })

  const checkYear = (yearInput: string) => {
    const trimmed = yearInput.trim()
    const parsedYear = Number(trimmed)

    if (!trimmed || Number.isNaN(parsedYear)) {
      setState(prev => ({ ...prev, message: "Введіть коректний рік." }))
      return
    }

    const message = isLeapYear(parsedYear)
      ? "Ви народилися у високосний рік!"
      : "Ви народилися у невисокосний рік."

    setState(prev => ({ ...prev, message }))
  }

  const setYear = (year: string) => {
    setState(prev => ({ ...prev, year }))
  }

  return {
    state,
    checkYear,
    setYear,
  }
}

export const useRockPaperScissors = () => {
  const [message, setMessage] = useState("Оберіть варіант, щоб зіграти.")
  const [score, setScore] = useState({ player: 0, computer: 0, ties: 0 })

  const playRound = (playerChoice: string) => {
    const computerChoice = pickComputerChoice()
    const result = getRoundResult(playerChoice, computerChoice)
    const newMessage = getResultMessage(result, playerChoice, computerChoice)

    setMessage(newMessage)

    setScore(prev => ({
      player: prev.player + (result === "win" ? 1 : 0),
      computer: prev.computer + (result === "lose" ? 1 : 0),
      ties: prev.ties + (result === "tie" ? 1 : 0),
    }))
  }

  const resetGame = () => {
    setMessage("Оберіть варіант, щоб зіграти.")
    setScore({ player: 0, computer: 0, ties: 0 })
  }

  return {
    message,
    score,
    playRound,
    resetGame,
  }
}