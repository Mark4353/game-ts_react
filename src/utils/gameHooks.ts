import { useState, useRef, useEffect } from "react"
import {
  generateRandomNumber,
  isLeapYear,
  pickComputerChoice,
  getRoundResult,
  getResultMessage,
  FootballCursor,
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

export const useCalculator = () => {
  const [state, setState] = useState({
    firstValue: "",
    secondValue: "",
    operator: "+",
    result: "0",
    error: "",
  })

  const setFirstValue = (value: string) => {
    setState(prev => ({ ...prev, firstValue: value, error: "" }))
  }

  const setSecondValue = (value: string) => {
    setState(prev => ({ ...prev, secondValue: value, error: "" }))
  }

  const setOperator = (operator: string) => {
    setState(prev => ({ ...prev, operator }))
  }

  const calculate = () => {
    const first = Number(state.firstValue.trim())
    const second = Number(state.secondValue.trim())

    if (Number.isNaN(first) || Number.isNaN(second)) {
      setState(prev => ({ ...prev, error: "Введіть два коректні числа.", result: "0" }))
      return
    }

    if (state.operator === "/" && second === 0) {
      setState(prev => ({ ...prev, error: "Ділення на нуль неможливе.", result: "0" }))
      return
    }

    const result =
      state.operator === "+"
        ? first + second
        : state.operator === "-"
        ? first - second
        : state.operator === "*"
        ? first * second
        : first / second

    setState(prev => ({
      ...prev,
      result: Number.isFinite(result) ? result.toString() : "0",
      error: "",
    }))
  }

  const reset = () => {
    setState({ firstValue: "", secondValue: "", operator: "+", result: "0", error: "" })
  }

  return {
    state,
    setFirstValue,
    setSecondValue,
    setOperator,
    calculate,
    reset,
  }
}

const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const parts = []

  if (days) parts.push(`${days} дн.`)
  if (hours || days) parts.push(`${hours.toString().padStart(2, '0')} год.`)
  if (minutes || hours || days) parts.push(`${minutes.toString().padStart(2, '0')} хв.`)
  parts.push(`${remainingSeconds.toString().padStart(2, '0')} с.`)

  return parts.join(' ')
}

export const useTimeCalculator = () => {
  const [state, setState] = useState({
    seconds: "",
    message: "Введіть кількість секунд",
  })

  const setSeconds = (seconds: string) => {
    setState(prev => ({ ...prev, seconds, message: "" }))
  }

  const calculate = () => {
    const value = Number(state.seconds.trim())

    if (!state.seconds.trim() || Number.isNaN(value) || value < 0) {
      setState(prev => ({ ...prev, message: "Введіть коректну кількість секунд." }))
      return
    }

    setState(prev => ({ ...prev, message: formatTime(value) }))
  }

  const reset = () => {
    setState({ seconds: "", message: "Введіть кількість секунд та натисніть 🔍" })
  }

  return {
    state,
    setSeconds,
    calculate,
    reset,
  }
}

export const useFootball = () => {
  const fieldRef = useRef<HTMLDivElement | null>(null)
  const [cursor, setCursor] = useState<FootballCursor>({ x: 220, y: 130, visible: true })
  const [started, setStarted] = useState<boolean>(false)

  useEffect(() => {
    const rect = fieldRef.current?.getBoundingClientRect()
    if (rect) {
      setCursor((c) => ({ ...c, x: Math.min(220, rect.width - 40), y: rect.height / 2 }))
    }
  }, [])

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!started) return
    const rect = fieldRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(16, Math.min(rect.width - 16, e.clientX - rect.left))
    const y = Math.max(16, Math.min(rect.height - 16, e.clientY - rect.top))
    setCursor({ x, y, visible: true })
    if (fieldRef.current) {
      fieldRef.current.style.setProperty('--cursor-x', `${x}px`)
      fieldRef.current.style.setProperty('--cursor-y', `${y}px`)
      fieldRef.current.style.setProperty('--cursor-opacity', '1')
    }
  }

  const handlePointerLeave = () => setCursor((c) => ({ ...c, visible: false }))

  useEffect(() => {
    const el = fieldRef.current
    if (el) {
      el.style.setProperty('--cursor-x', `${cursor.x}px`)
      el.style.setProperty('--cursor-y', `${cursor.y}px`)
      el.style.setProperty('--cursor-opacity', cursor.visible ? '1' : '0')
    }
  }, [cursor])

  return {
    fieldRef,
    cursor,
    handlePointerMove,
    handlePointerLeave,
    started,
    startGame: () => setStarted(true),
    resetGame: () => setStarted(false),
  }
}
