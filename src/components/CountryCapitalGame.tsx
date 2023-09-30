import { useState } from "react";
import "../App.css";

type Status = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  status: Status;
};

export default function CountryCapitalGame({
  data,
}: {
  data: Record<string, string>;
}) {
  const randomizeData = () => {
    return Math.random() - 0.5;
  };

  const getCountries = (data: Record<string, string>) => {
    return Object.keys(data);
  };

  const getCapitals = (data: Record<string, string>) => {
    return Object.values(data);
  };

  const [selected, setSelected] = useState<Option>();
  const [options, setOptions] = useState<Option[]>(
    [...getCountries(data), ...getCapitals(data)]
      .sort(randomizeData)
      .map((option) => ({
        value: option,
        status: "DEFAULT",
      }))
  );

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
      const capital = data[option.value];
      const selectedCapital = data[selected.value];
      if (selected.value === capital || selectedCapital === option.value) {
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
    return "Congratulations!";
  }

  return (
    <>
      {options.map((option) => (
        <button
          key={option.value}
          className={statusColorClass(option)}
          onClick={() => validationHandler(option)}
        >
          {option.value}
        </button>
      ))}
    </>
  );
}
