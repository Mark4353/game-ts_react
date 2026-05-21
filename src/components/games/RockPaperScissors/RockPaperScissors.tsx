import { useRockPaperScissors, RPS_OPTIONS } from "@/utils";
import "./RockPaperScissors.css"

const RockPaperScissorsSection = () => {
  const { message, score, playRound, resetGame } = useRockPaperScissors()

  return (
    <section className="game-section rps-section">
      <h2>Камінь - ножиці - папір</h2>
      <div className="rps-buttons">
        {RPS_OPTIONS.map((option: string) => (
          <button key={option} type="button" onClick={() => playRound(option)}>
            {option}
          </button>
        ))}
      </div>
      <p className="result-text">{message}</p>
      <div className="rps-score">
        <span>Комп’ютер: {score.computer}</span>
        <span>Ви: {score.player}</span>
        <span>Нічії: {score.ties}</span>
      </div>
      <button className="secondary-button" type="button" onClick={resetGame}>
        Скинути
      </button>
    </section>
  )
}

export default RockPaperScissorsSection
