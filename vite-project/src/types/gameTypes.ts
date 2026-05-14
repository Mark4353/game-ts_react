export type GameResult = "win" | "lose" | "tie"
export const RPS_OPTIONS = ["Камінь", "Ножиці", "Папір"]

export interface GuessNumberState {
  guess: string
  target: number
  feedback: string
  attempts: number
  won: boolean
}

export interface LeapYearState {
  year: string
  message: string
}

export const isLeapYear = (year: number): boolean =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

export const generateRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const pickComputerChoice = (): string =>
  RPS_OPTIONS[Math.floor(Math.random() * RPS_OPTIONS.length)]

export const getRoundResult = (player: string, computer: string): GameResult => {
  if (player === computer) {
    return "tie"
  }

  const winsAgainst: Record<string, string> = {
    Камінь: "Ножиці",
    Ножиці: "Папір",
    Папір: "Камінь",
  }

  return winsAgainst[player] === computer ? "win" : "lose"
}

export const getResultMessage = (result: GameResult, playerChoice: string, computerChoice: string): string => {
  const resultMessages = {
    win: "Ви виграли раунд!",
    lose: "Ви програли раунд.",
    tie: "Нічия!",
  }

  return `${resultMessages[result]} Ви: ${playerChoice}, Комп'ютер: ${computerChoice}.`
}