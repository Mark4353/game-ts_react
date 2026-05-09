import LeapYearSection from "../components/games/LeapYear";
import GuessNumberSection from "../components/games/GuessNumber";
import RockPaperScissorsSection from "../components/games/RockPaperScissors";
import CalculatorSection from "../components/games/Calculator";
import TimeCalculatorSection from "../components/games/TimeCalculator";
import Football from "../components/games/Football";
import TheLargestNumber from "../components/games/TheLargestNumber";
import Team from "../components/games/Team";

const HomePage = () => {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <h1>Популярні інтерактивні ігри</h1>
        <p>
          Перевір рік народження, вгадай число, зіграй у камінь-ножиці-папір та
          інші міні-ігри.
        </p>
      </section>
      <LeapYearSection />
      <GuessNumberSection />
      <RockPaperScissorsSection />
      <CalculatorSection />
      <TimeCalculatorSection />
      <Football />
      <TheLargestNumber />
      <Team />
    </main>
  );
};

export default HomePage;
