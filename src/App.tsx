import CountryCapitalGame from "./components/CountryCapitalGame";
import GameData from "./assets/country-capital-data.json";

const App = () => {
  return (
    <>
      <CountryCapitalGame data={GameData} />
    </>
  );
};

export default App;
