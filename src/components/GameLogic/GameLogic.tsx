import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./GameLogic.css";

type Status = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  status: Status;
  correspondingValue: string;
};

export default function GameLogic({ data }: { data: Option[] }) {
  const [selected, setSelected] = useState<Option>();
  const [options, setOptions] = useState<Option[]>(data);

  const isGameOver = options.length === 0;

  const isPartOfPair = (opt: Option, selected: Option, option: Option) => {
    return opt.value === selected.value || opt.value === option.value;
  };

  const validationHandler = (option: Option) => {
    if (!selected) {
      setSelected(option);
      setOptions(
        options.map((opt) => ({
          ...opt,
          status: opt === option ? "SELECTED" : "DEFAULT",
        }))
      );
    } else {
      if (
        selected.value === option.correspondingValue ||
        option.value === selected.correspondingValue
      ) {
        setOptions(
          options.filter((opt) => !isPartOfPair(opt, option, selected))
        );
      } else {
        setOptions(
          options.map((opt) => ({
            ...opt,
            status: isPartOfPair(opt, option, selected) ? "WRONG" : opt.status,
          }))
        );
      }

      setSelected(undefined);
    }
  };

  const statusColorClass = (option: Option) => {
    if (option.status === "SELECTED") {
      return "selected";
    } else if (option.status === "WRONG") {
      return "wrong";
    } else return "";
  };

  if (isGameOver) {
    return <div className="container">Congratulations!</div>;
  }

  return (
    <div className="container">
      {options.map((option) => (
        <button
          key={uuidv4()}
          className={statusColorClass(option)}
          onClick={() => validationHandler(option)}
        >
          {option.value}
        </button>
      ))}
    </div>
  );
}
