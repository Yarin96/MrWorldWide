import "../App.css";

const randomizeData = () => {
  return Math.random() - 0.5;
};

const getCountries = (data: Record<string, string>) => {
  return Object.keys(data);
};

const getCapitals = (data: Record<string, string>) => {
  return Object.values(data);
};

const arrayOfOptions = (data: Record<string, string>) => {
  return [...getCountries(data), ...getCapitals(data)];
};

export default function CountryCapitalGame({
  data,
}: {
  data: Record<string, string>;
}) {
  return (
    <>
      {arrayOfOptions(data)
        .sort(randomizeData)
        .map((option) => (
          <button key={option}>{option}</button>
        ))}
    </>
  );
}
