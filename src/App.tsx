import { useEffect, useState } from "react";
import GameLogic from "./components/GameLogic/GameLogic";
import GameData from "./assets/country-capital-data.json";
import Instructions from "./components/Instructions/Instructions";

type Status = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  status: Status;
  correspondingValue: string;
};

const PAIRS_NUM = 10; /// Change this for more pair-options in each game.

const App = () => {
  const [selectedPairs, setSelectedPairs] = useState<Option[]>();

  useEffect(() => {
    const pairs = Object.entries(GameData);
    shufflePairs(pairs);
    const selectedRandomizedPairs = pairs
      .slice(0, PAIRS_NUM)
      .flatMap(([country, capital]) => [
        {
          value: country,
          status: "DEFAULT" as Status,
          correspondingValue: capital,
        },
        {
          value: capital,
          status: "DEFAULT" as Status,
          correspondingValue: country,
        },
      ]);

    setSelectedPairs(selectedRandomizedPairs.sort(randomizeData));
  }, []);

  const randomizeData = () => {
    return Math.random() - 0.5;
  };

  const shufflePairs = (pairsArray: [string, string][]) => {
    for (let i = pairsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairsArray[i], pairsArray[j]] = [pairsArray[j], pairsArray[i]];
    }
  };

  return (
    <>
      <Instructions />
      {selectedPairs ? (
        <GameLogic data={selectedPairs} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default App;
