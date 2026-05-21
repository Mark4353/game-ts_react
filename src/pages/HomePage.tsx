import LeapYearSection from "../components/games/LeapYear/LeapYear";
import GuessNumberSection from "../components/games/GuessNumber/GuessNumber";
import RockPaperScissorsSection from "../components/games/RockPaperScissors/RockPaperScissors";
import CalculatorSection from "../components/games/Calculator/Calculator";
import TimeCalculatorSection from "../components/games/TimeCalculator/TimeCalculator";
import FootballSection from "../components/games/Football/Football";
// import TheLargestNumber from "../components/games/TheLargestNumber/TheLargestNumber";
// import Team from "../components/games/Team/Team";

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
      <FootballSection />
      {/* <TheLargestNumber />
      <Team /> */}
    </main>
  );
};

export default HomePage;
